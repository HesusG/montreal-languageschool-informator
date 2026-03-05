"""Scraper for Montreal French language schools."""

from .base import BaseScraper


class MontrealSchoolsScraper(BaseScraper):
    def scrape(self) -> list[dict]:
        # TODO: Implement actual scraping logic
        # For now, returns empty list (data is hand-authored in public/data/)
        return []
