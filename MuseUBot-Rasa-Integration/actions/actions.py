from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
from rasa_sdk.events import AllSlotsReset, Restarted


class ActionExtractDetails(Action):
    def name(self) -> Text:
        return "action_extract_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        state = tracker.get_slot('state')
        city = tracker.get_slot('city')
        date = tracker.get_slot('date')

        # Debug statements to check slot values
        print(f"State: {state}, City: {city}, Date: {date}")

        missing_slots = []
        if not state:
            missing_slots.append("state")
        if not city:
            missing_slots.append("city")
        if not date:
            missing_slots.append("date")

        if missing_slots:
            dispatcher.utter_message(text=f"Please provide the following details: {', '.join(missing_slots)}")
            return []

        dispatcher.utter_message(text=f"Details provided - State: {state}, City: {city}, Date: {date}")
        return [SlotSet("state", state), SlotSet("city", city), SlotSet("date", date)]

class ActionCheckAvailability(Action):
    def name(self) -> Text:
        return "action_check_availability"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        state = tracker.get_slot('state')
        city = tracker.get_slot('city')
        date = tracker.get_slot('date')

        # Example: Query the database based on slots
        available_museums = query_database(state, city, date)

        if available_museums:
            message = f"Available museums in {city}, {state} on {date}: {', '.join(available_museums)}"
        else:
            message = f"Sorry, no museums are available in {city}, {state} on {date}."

        dispatcher.utter_message(text=message)
        return []

def query_database(state, city, date):
    # Dummy function to simulate database query
    # Replace this with actual database access code
    return ["Museum A", "Museum B", "Museum C"]

class ActionProcessBooking(Action):
    def name(self) -> Text:
        return "action_process_booking"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        state = tracker.get_slot('state')
        city = tracker.get_slot('city')
        date = tracker.get_slot('date')
        museum = tracker.get_slot('museum')  # Assuming museum slot is set after user selects one

        if not state or not city or not date or not museum:
            dispatcher.utter_message(text="Please provide the state, city, date, and museum to process the booking.")
            return []

        # Example: Process the booking
        booking_confirmation = process_booking(state, city, date, museum)

        if booking_confirmation:
            message = f"Your booking for {museum} in {city}, {state} on {date} has been confirmed!"
        else:
            message = "Sorry, there was an issue processing your booking. Please try again."

        dispatcher.utter_message(text=message)
        return []

def process_booking(state, city, date, museum):
    # Dummy function to simulate booking process
    # Replace this with actual booking processing code
    return True

class ActionResetConversation(Action):
    def name(self):
        return "action_reset_conversation"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text="Conversation has been reset!!")
        return [AllSlotsReset(), Restarted()]
