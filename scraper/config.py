"""Scraper configuration: URLs, selectors, fallback coordinates."""

import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'data')

SCHOOLS_OUTPUT = os.path.join(OUTPUT_DIR, 'schools.json')
ACCOMMODATIONS_OUTPUT = os.path.join(OUTPUT_DIR, 'accommodations.json')
SAFETY_OUTPUT = os.path.join(OUTPUT_DIR, 'safety.json')

# Fallback coordinates for geocoding failures
FALLBACK_COORDS = {
    'montreal': {'lat': 45.5017, 'lng': -73.5673},
    'quebec': {'lat': 46.8139, 'lng': -71.2080},
}

USER_AGENT = 'Montreal-LanguageSchool-Informator/1.0 (educational project)'
