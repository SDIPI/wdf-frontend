export default class Utils {
  static today() {
    return this.dayString(new Date().toString());
  }

  static dayString(dateString: string) {
    let date = new Date(dateString);
    let dd: string|number = date.getDate();
    let mm: string|number = date.getMonth()+1; //January is 0!
    let yyyy = date.getFullYear();
    if(dd<10){
      dd='0'+dd
    }
    if(mm<10){
      mm='0'+mm
    }
    return yyyy+'-'+mm+'-'+dd;
  }
}
