import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {DoctorService} from './Doctor-interface.js'


$(document).ready(function() {
  $('#doctorButton').click(function(event) {
    event.preventDefault();
      let name = $('#enteredName').val();
      $('#enteredName').val("");
      let medicalIssue = $('#enteredMedicalIssue').val();
      $('#enteredMedicalIssue').val("");


        let doctorSearch = new DoctorService();

        let promise = doctorSearch.getDoctorBySearch(name, medicalIssue);
        promise.then(function(response) {

        let doctorProfile = JSON.parse(response);
        console.log(name);
        // console.log(medicalIssue);
        console.log(doctorSearch);
        console.log(doctorProfile.data.length);

        if (doctorProfile.data.length > 0) {
        $('.showDoctors').empty();

          for(let i=0; i<doctorProfile.data.length; i++) {
            $('.showDoctors').append(
              `<div class="card"><div class="card-title">${doctorProfile.data[i].profile.first_name}
              ${doctorProfile.data[i].profile.last_name}</div>
              <table>
              <tr>
              <td>
              <ul>
              <li>Name of Practice: ${doctorProfile.data[i].practices[0].name}</li>
              <li>Address: ${doctorProfile.data[i].practices[0].visit_address.street}<br>${doctorProfile.data[i].practices[0].visit_address.city}, ${doctorProfile.data[i].practices[0].visit_address.state} ${doctorProfile.data[i].practices[0].visit_address.zip}</li>
              <li>Phone Number: ${doctorProfile.data[i].practices[0].phones[0].number}</li>
              <li><a href="${doctorProfile.data[i].practices[0].website}">Website</a></li>
              <li>${doctorProfile.data[i].practices[0].accepts_new_patients}</li></ul><br>
              </td>
              <td>
              <img id="profilePhoto" src="${doctorProfile.data[i].profile.image_url}">
              </tr></td>
              </table>
              </div><br>`);

          }
        } else { $('.showDoctors').text('No doctors were found in your area that match your search.');
      }
        })

        // if (${doctorProfile.data[i].practices[0].accepts_new_patients} === "true"){
        //   return "Yes";
        // }


    });
    });
