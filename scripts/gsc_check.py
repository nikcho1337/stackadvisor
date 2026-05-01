"""One-shot GSC report for stackadvisor.io.

Pulls last 28 days of search performance + a coverage sanity check,
prints a summary that's easy to read in the terminal.
"""

from __future__ import annotations

import datetime as dt
import os
import sys
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

KEY_PATH = Path(r"C:\Users\jaarj\Downloads\gen-lang-client-0771771526-ae37892be619.json")
SITE_URL = "sc-domain:stackadvisor.io"
SITE_URL_HTTPS = "https://stackadvisor.io/"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def make_service():
    creds = service_account.Credentials.from_service_account_file(
        str(KEY_PATH), scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def list_sites(svc) -> list[dict]:
    return svc.sites().list().execute().get("siteEntry", [])


def query(svc, site: str, start: str, end: str, dimensions: list[str], row_limit: int = 25):
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    return svc.searchanalytics().query(siteUrl=site, body=body).execute()


def fmt_row(row: dict, dims: list[str]) -> str:
    keys = row.get("keys", [])
    label = " | ".join(keys) if keys else "(total)"
    return (
        f"{label[:70]:70s}  "
        f"clicks={int(row['clicks']):>5}  "
        f"impr={int(row['impressions']):>6}  "
        f"ctr={row['ctr']*100:5.2f}%  "
        f"pos={row['position']:5.2f}"
    )


def main() -> int:
    if not KEY_PATH.exists():
        print(f"ERROR: service account key not found at {KEY_PATH}", file=sys.stderr)
        return 2

    svc = make_service()

    print("=" * 96)
    print("Verified properties on this service account:")
    print("=" * 96)
    sites = list_sites(svc)
    if not sites:
        print("  (none — service account has no GSC properties yet)")
    target_found = None
    for s in sites:
        marker = "  "
        if "stackadvisor" in s["siteUrl"]:
            marker = "->"
            target_found = s["siteUrl"]
        print(f"  {marker} {s['siteUrl']:55s}  permission={s['permissionLevel']}")
    print()

    if not target_found:
        print("stackadvisor.io is NOT on this service account.")
        print("Add this email as a Restricted user in Search Console for stackadvisor.io:")
        print("  gsc-reader@gen-lang-client-0771771526.iam.gserviceaccount.com")
        return 1

    site = target_found
    end = dt.date.today() - dt.timedelta(days=2)
    start = end - dt.timedelta(days=27)
    start_s, end_s = start.isoformat(), end.isoformat()

    print(f"Site:   {site}")
    print(f"Window: {start_s} -> {end_s}  (last 28 days, GSC has ~2-day lag)")
    print()

    print("-" * 96)
    print("TOTALS")
    print("-" * 96)
    totals = query(svc, site, start_s, end_s, dimensions=[], row_limit=1)
    rows = totals.get("rows", [])
    if not rows:
        print("  (no impressions in window — site may be too new or not indexed)")
    else:
        print(" ", fmt_row(rows[0], []))
    print()

    print("-" * 96)
    print("TOP 25 QUERIES")
    print("-" * 96)
    qres = query(svc, site, start_s, end_s, ["query"], row_limit=25)
    for r in qres.get("rows", []):
        print(" ", fmt_row(r, ["query"]))
    if not qres.get("rows"):
        print("  (no queries)")
    print()

    print("-" * 96)
    print("TOP 25 PAGES")
    print("-" * 96)
    pres = query(svc, site, start_s, end_s, ["page"], row_limit=25)
    for r in pres.get("rows", []):
        print(" ", fmt_row(r, ["page"]))
    if not pres.get("rows"):
        print("  (no pages)")
    print()

    print("-" * 96)
    print("BY COUNTRY (top 10)")
    print("-" * 96)
    cres = query(svc, site, start_s, end_s, ["country"], row_limit=10)
    for r in cres.get("rows", []):
        print(" ", fmt_row(r, ["country"]))
    print()

    print("-" * 96)
    print("BY DEVICE")
    print("-" * 96)
    dres = query(svc, site, start_s, end_s, ["device"], row_limit=10)
    for r in dres.get("rows", []):
        print(" ", fmt_row(r, ["device"]))
    print()

    print("-" * 96)
    print("HIGH-IMPRESSION / ZERO-CLICK QUERIES (>=3 impressions, 0 clicks)")
    print("-" * 96)
    zres = query(svc, site, start_s, end_s, ["query"], row_limit=200)
    zero_click = [
        r for r in zres.get("rows", [])
        if r["clicks"] == 0 and r["impressions"] >= 3
    ]
    zero_click.sort(key=lambda r: r["impressions"], reverse=True)
    for r in zero_click[:25]:
        print(" ", fmt_row(r, ["query"]))
    if not zero_click:
        print("  (none)")
    print()

    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except HttpError as e:
        print(f"\nHTTP ERROR: {e}", file=sys.stderr)
        sys.exit(3)
