import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";



actor {
  // Common Types
  public type Language = { #gujarati; #hindi; #english };

  // Contacts Types & Logic
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
      Int.compare(contact2.timestamp, contact1.timestamp);
    };
  };

  let contacts = Map.empty<Nat, Contact>();

  var contactId = 0;
  var defaultReply : Text = "Thank you for contacting Master Pipe Solution. We will get back to you shortly.";
  var pageVisits = 0;

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

  // Workers Types & Logic
  public type Worker = {
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

  module Worker {
    public func compareByAvailability(w1 : Worker, w2 : Worker) : Order.Order {
      switch (Bool.compare(w1.isAvailable, w2.isAvailable)) {
        case (#equal) { Text.compare(w1.name, w2.name) };
        case (other) { other };
      };
    };
  };

  let workers = Map.empty<Nat, Worker>();
  var workerIdCounter = 0;

  public shared ({ caller }) func addWorker(name : Text, age : Nat, bloodGroup : Text, emergencyNumber : Text, mobileNumber : Text, zipCode : Text) : async Nat {
    let worker : Worker = {
      id = workerIdCounter;
      name;
      age;
      bloodGroup;
      emergencyNumber;
      mobileNumber;
      rating = 5.0;
      workVolume = 0;
      zipCode;
      isAvailable = true;
    };

    workers.add(workerIdCounter, worker);
    workerIdCounter += 1;
    workerIdCounter - 1;
  };

  public query ({ caller }) func getAllWorkers() : async [Worker] {
    workers.values().toArray().sort(Worker.compareByAvailability);
  };

  public query ({ caller }) func getWorker(id : Nat) : async Worker {
    switch (workers.get(id)) {
      case (null) { Runtime.trap("Worker not found") };
      case (?worker) { worker };
    };
  };

  public shared ({ caller }) func updateWorker(id : Nat, name : Text, age : Nat, bloodGroup : Text, emergencyNumber : Text, mobileNumber : Text, zipCode : Text) : async () {
    switch (workers.get(id)) {
      case (null) { Runtime.trap("Worker not found") };
      case (?worker) {
        let updatedWorker = { worker with name; age; bloodGroup; emergencyNumber; mobileNumber; zipCode };
        workers.add(id, updatedWorker);
      };
    };
  };

  public shared ({ caller }) func deleteWorker(id : Nat) : async () {
    switch (workers.get(id)) {
      case (null) { Runtime.trap("Worker not found") };
      case (?_) {
        workers.remove(id);
      };
    };
  };

  public shared ({ caller }) func updateWorkerRating(id : Nat, rating : Float) : async () {
    switch (workers.get(id)) {
      case (null) { Runtime.trap("Worker not found") };
      case (?worker) {
        if (rating < 1.0 or rating > 5.0) {
          Runtime.trap("Rating must be between 1 and 5 ");
        };
        let updatedWorker = { worker with rating };
        workers.add(id, updatedWorker);
      };
    };
  };

  public shared ({ caller }) func setWorkerAvailability(id : Nat, isAvailable : Bool) : async () {
    switch (workers.get(id)) {
      case (null) { Runtime.trap("Worker not found") };
      case (?worker) {
        let updatedWorker = { worker with isAvailable };
        workers.add(id, updatedWorker);
      };
    };
  };

  // Assignments Types & Logic
  public type Assignment = {
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

  let assignments = Map.empty<Nat, Assignment>();
  var assignmentIdCounter = 0;

  public shared ({ caller }) func assignWork(workerId : Nat, customerName : Text, customerPhone : Text, customerAddress : Text, customerZip : Text, jobDescription : Text) : async Nat {
    let worker = switch (workers.get(workerId)) {
      case (null) { Runtime.trap("Worker not found") };
      case (?worker) { worker };
    };

    let assignment : Assignment = {
      id = assignmentIdCounter;
      workerId;
      customerName;
      customerPhone;
      customerAddress;
      customerZip;
      workerZip = worker.zipCode;
      jobDescription;
      status = "pending";
      timestamp = Time.now();
    };

    assignments.add(assignmentIdCounter, assignment);
    assignmentIdCounter += 1;
    assignmentIdCounter - 1;
  };

  public shared ({ caller }) func updateAssignmentStatus(id : Nat, status : Text) : async () {
    switch (assignments.get(id)) {
      case (null) { Runtime.trap("Assignment not found") };
      case (?assignment) {
        let updatedAssignment = { assignment with status };
        assignments.add(id, updatedAssignment);
      };
    };
  };

  public query ({ caller }) func getAllAssignments() : async [Assignment] {
    assignments.values().toArray();
  };

  public query ({ caller }) func getWorkerAssignments(workerId : Nat) : async [Assignment] {
    assignments.values().toArray().filter(func(a) { a.workerId == workerId });
  };
};
