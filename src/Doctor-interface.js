export class DoctorService {

  getDoctorBySearch(name, medicalIssue) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://CORS-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&query=${medicalIssue}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
