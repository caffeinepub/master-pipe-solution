import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type Language = { #gujarati; #hindi; #english };

  public type Contact = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
    language : Language;
    status : Text;
    timestamp : Int;
  };

  module Contact {
    public func compare(contact1 : Contact, contact2 : Contact) : Order.Order {
      Nat.compare(contact1.id, contact2.id);
    };
  };

  let contacts = Map.empty<Nat, Contact>();
  var contactId = 0;
  var pageVisits = 0;

  var defaultReply : Text = "Thank you for contacting Master Pipe Solution. We will get back to you shortly.";

  public shared ({ caller }) func submitContact(name : Text, phone : Text, message : Text, language : Language) : async () {
    let contact : Contact = {
      id = contactId;
      name;
      phone;
      message;
      language;
      status = "new";
      timestamp = Time.now();
    };

    contacts.add(contactId, contact);
    contactId += 1;
  };

  public shared ({ caller }) func incrementVisits() : async () {
    pageVisits += 1;
  };

  public query ({ caller }) func getVisitCount() : async Nat {
    pageVisits;
  };

  public query ({ caller }) func getAllContacts() : async [Contact] {
    contacts.values().toArray().sort();
  };

  public query ({ caller }) func getContact(id : Nat) : async Contact {
    switch (contacts.get(id)) {
      case (null) { Runtime.trap("Contact not found") };
      case (?contact) { contact };
    };
  };

  public shared ({ caller }) func updateContactStatus(id : Nat, status : Text) : async () {
    switch (contacts.get(id)) {
      case (null) { Runtime.trap("Contact not found") };
      case (?contact) {
        let updatedContact = { contact with status };
        contacts.add(id, updatedContact);
      };
    };
  };

  public shared ({ caller }) func setDefaultReply(text : Text) : async () {
    defaultReply := text;
  };

  public query ({ caller }) func getDefaultReply() : async Text {
    defaultReply;
  };
};
