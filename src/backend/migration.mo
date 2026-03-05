import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Array "mo:core/Array";

module {
  public type Language = { #gujarati; #hindi; #english };

  public type OldContact = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
    language : Language;
  };

  public type NewContact = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
    language : Language;
    status : Text;
    timestamp : Int;
  };

  public type OldActor = {
    contacts : Map.Map<Nat, OldContact>;
    contactId : Nat;
    pageVisits : Nat;
  };

  public type NewActor = {
    contacts : Map.Map<Nat, NewContact>;
    contactId : Nat;
    pageVisits : Nat;
    defaultReply : Text;
  };

  public func run(old : OldActor) : NewActor {
    let newContacts = old.contacts.map<Nat, OldContact, NewContact>(
      func(_id, contact) {
        {
          contact with
          status = "unknown";
          timestamp = 0;
        };
      }
    );
    { old with contacts = newContacts; defaultReply = "Thank you for contacting Master Pipe Solution. We will get back to you shortly." };
  };
};
