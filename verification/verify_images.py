from playwright.sync_api import sync_playwright

def verify_images(page):
    page.goto("http://localhost:3000")

    # Wait for the card deck to load
    page.wait_for_selector('img[alt="Mittens"]')

    # Check if the main card image is present and visible
    img = page.locator('img[alt="Mittens"]')
    if img.is_visible():
        print("Main card image is visible")
    else:
        print("Main card image is NOT visible")

    # Take a screenshot
    page.screenshot(path="verification/home_page.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_images(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
