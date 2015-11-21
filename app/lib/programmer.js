import Ember from 'ember';

export default Ember.Object.extend({
  // firstName: null,
  // lastName: null,
  // nickName: null,
  // age: null,
  // authorOf: null,
  // conferences: [],
  fullName: Ember.computed("firstName", "lastName", function(){
    return `${this.get("firstName")} ${this.get("lastName")}`;
  }),

  greet: function(){
    return `Hi, My name is ${this.get("fullName")}. You can call me ${this.get("nickName")}`;
  },
  
  isOld: Ember.computed.gte("age", 30),
  // isOld: Ember.computed("age", fucntion(){
  //   return this.get('age') >=30;
  // })

  wroteRuby: Ember.computed.equal("authorOf", "Ruby"),

  // addConference: function (conference){
  //   var conferences = this.get('conferences');
  //   conferences.push(conference);
  // },
  // keyNoteConferences: Ember.computed('conferences.@each.keyNote', function(){
  //   var conferences = this.get('conferences');
  //   return conferences.filterBy('keyNote', `${this.firstName} ${this.lastName}`);
  // }),

 
  addConference: function(conference){
    this.get('conferences').pushObject(conference);
  },

  keyNoteConferences: Ember.computed.filter("conferences.@each.keyNote", function(conference){
    // debugger;
    return conference.keyNote === this.get("fullName");
  }),

  conferenceNames: Ember.computed.mapBy("conferences", "name"),

  // conferenceNames: Ember.computed.map('conferences', function(conferences){
  //   return conferences.name;
  // }),

  // conferenceNames: Ember.computed("conferences.[]", "conferences.@each.name", function(){
  //   return  this.get('conferences').mapBy('name');
  // }),

  conferenceTotal: Ember.computed.alias('conferences.length'),
  itinerary: Ember.computed("nickName", "conferenceTotal", function(){
    return `${this.get("nickName")} is speaking at ${this.get("conferenceTotal")+ " conferences"}`;
  }),

  hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),

  hasFirstName: Ember.computed.notEmpty("firstName"),
  hasLastName: Ember.computed.notEmpty("lastName"),
  hasAge: Ember.computed.notEmpty("age"),
  isValid: Ember.computed.and("hasFirstName","hasLastName","hasAge", "hasValidEmail"),
  isInvalid: Ember.computed.not("isValid"),
  hasErrors: Ember.computed.notEmpty("errors"),
  errors: Ember.computed("hasAge", "hasFirstName", "hasLastName", "hasValidEmail", function(){
    let errors=[];
    if(!this.get("hasAge")){
      errors.pushObject("age cannot be blank");
    }
    if(!this.get("hasFirstName")){
      errors.pushObject("firstName cannot be blank");
    }
    if(!this.get("lastName")){
      errors.pushObject("lastName cannot be blank");
    }
    if(!this.get("hasValidEmail")){
      errors.pushObject("email must be valid");
    }
    return errors;
  })


});






