"""Entry point for running all scrapers."""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from config import SCHOOLS_OUTPUT, ACCOMMODATIONS_OUTPUT, SAFETY_OUTPUT, OUTPUT_DIR
from scrapers.schools_montreal import MontrealSchoolsScraper
from scrapers.schools_quebec import QuebecSchoolsScraper
from scrapers.accommodations_montreal import MontrealAccommodationsScraper
from scrapers.accommodations_quebec import QuebecAccommodationsScraper
from scrapers.safety import SafetyScraper


def write_json(data, filepath: str):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Wrote {filepath} ({len(data) if isinstance(data, list) else 'object'})")


def main():
    print("Running scrapers...")

    # Schools
    schools = []
    for ScraperClass in [MontrealSchoolsScraper, QuebecSchoolsScraper]:
        try:
            scraper = ScraperClass()
            schools.extend(scraper.scrape())
        except Exception as e:
            print(f"Error in {ScraperClass.__name__}: {e}")

    if schools:
        write_json(schools, SCHOOLS_OUTPUT)
    else:
        print("No school data scraped, keeping existing file.")

    # Accommodations
    accommodations = []
    for ScraperClass in [MontrealAccommodationsScraper, QuebecAccommodationsScraper]:
        try:
            scraper = ScraperClass()
            accommodations.extend(scraper.scrape())
        except Exception as e:
            print(f"Error in {ScraperClass.__name__}: {e}")

    if accommodations:
        write_json(accommodations, ACCOMMODATIONS_OUTPUT)
    else:
        print("No accommodation data scraped, keeping existing file.")

    # Safety
    try:
        safety_scraper = SafetyScraper()
        safety_data = safety_scraper.scrape()
        if safety_data:
            write_json(safety_data, SAFETY_OUTPUT)
        else:
            print("No safety data scraped, keeping existing file.")
    except Exception as e:
        print(f"Error in SafetyScraper: {e}")

    print("Done.")


if __name__ == '__main__':
    main()
