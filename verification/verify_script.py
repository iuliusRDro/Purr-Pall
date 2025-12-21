from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        print("Navigating...")
        page.goto("http://localhost:3000")

        # Wait for "Mittens" (first mock cat)
        print("Waiting for Mittens...")
        page.wait_for_selector("text=Mittens", timeout=10000)

        # Verify Deck Buttons exist
        pass_btn = page.locator("button[aria-label='Pass']")
        like_btn = page.locator("button[aria-label='Like']")

        if pass_btn.is_visible() and like_btn.is_visible():
            print("Deck buttons found.")
        else:
            print("Deck buttons NOT found.")

        # Take screenshot of Deck
        page.screenshot(path="verification/deck_view.png")
        print("Deck screenshot taken.")

        # Need to verify Chat Interface
        # To get to chat, we usually need to "Match"
        # Since logic for matching isn't clear (might be random 50% chance or always match in mock?)
        # Let's check MatchesList.tsx to see where it gets data.
        # Assuming we can just go to Matches tab.

        page.locator("text=Matches").click()
        print("Clicked Matches tab.")

        # If MatchesList uses MOCK data, we might see some.
        # Wait for a match.
        try:
             # Wait a bit
            page.wait_for_timeout(1000)

            # Look for any clickable match.
            # MatchesList usually lists cats.
            # If no matches, we can't test chat easily without forcing state.
            # But let's check if we see "No matches yet" or similar.

            if page.locator("text=No matches yet").is_visible():
                 print("No matches yet. Going back to Deck to swipe right.")
                 page.locator("text=Explore").click()
                 page.wait_for_selector("text=Mittens")
                 page.locator("button[aria-label='Like']").click()
                 page.wait_for_timeout(500)
                 page.locator("text=Matches").click()

            # Now hope we have a match
            # Wait for a div that might be a match row.
            # Assuming list items have names like "Mittens"

            # Just click the first element that looks like a match card (usually has an image)
            # Or text "Mittens"
            match_el = page.locator("text=Mittens").first
            if match_el.is_visible():
                match_el.click()
                print("Clicked match.")

                # Now in Chat
                page.wait_for_selector("input[placeholder='Type a message...']", timeout=5000)

                chat_input = page.locator("input[placeholder='Type a message...']")
                max_length = chat_input.get_attribute("maxlength")
                print(f"Chat input maxLength: {max_length}")

                if max_length == "500":
                    print("SUCCESS: Max length is 500.")
                else:
                    print(f"FAILURE: Max length is {max_length}.")

                # Type long text
                long_text = "a" * 460
                chat_input.fill(long_text)

                # Verify warning color
                # The counter is span containing text "460/500"
                counter = page.locator("text=460/500")
                if counter.is_visible():
                     print("Counter visible.")
                     # Check class for red color
                     class_attr = counter.get_attribute("class")
                     if "text-red-500" in class_attr:
                         print("SUCCESS: Warning color active.")
                     else:
                         print(f"FAILURE: Warning color not active. Class: {class_attr}")

                # Take screenshot of Chat with counter
                page.screenshot(path="verification/chat_view.png")
                print("Chat screenshot taken.")

            else:
                print("Could not find a match to click.")

        except Exception as e:
            print(f"Could not verify chat: {e}")
            # Take a debug screenshot
            page.screenshot(path="verification/debug_error.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
