import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    contacts : Map.Map<Nat, OldContact>;
    contactId : Nat;
    defaultReply : Text;
    pageVisits : Nat;
  };

  type OldContact = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
    language : OldLanguage;
    status : Text;
    timestamp : Int;
  };

  type OldLanguage = {
    #gujarati;
    #hindi;
    #english;
  };

  type NewActor = {
    contacts : Map.Map<Nat, OldContact>;
    contactId : Nat;
    defaultReply : Text;
    pageVisits : Nat;
    workers : Map.Map<Nat, NewWorker>;
    workerIdCounter : Nat;
    assignments : Map.Map<Nat, NewAssignment>;
    assignmentIdCounter : Nat;
  };

  type NewWorker = {
    id : Nat;
    name : Text;
    age : Nat;
    bloodGroup : Text;
    emergencyNumber : Text;
    mobileNumber : Text;
    rating : Float;
    workVolume : Nat;
    zipCode : Text;
    isAvailable : Bool;
  };

  type NewAssignment = {
    id : Nat;
    workerId : Nat;
    customerName : Text;
    customerPhone : Text;
    customerAddress : Text;
    customerZip : Text;
    workerZip : Text;
    jobDescription : Text;
    status : Text;
    timestamp : Int;
  };

  public func run(old : OldActor) : NewActor {
    {
      contacts = old.contacts;
      contactId = old.contactId;
      defaultReply = old.defaultReply;
      pageVisits = old.pageVisits;
      workers = Map.empty<Nat, NewWorker>();
      workerIdCounter = 0;
      assignments = Map.empty<Nat, NewAssignment>();
      assignmentIdCounter = 0;
    };
  };
};
