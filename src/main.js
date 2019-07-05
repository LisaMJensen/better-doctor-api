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

        let doctorSearch = new DoctorService();

        let promise = doctorSearch.getDoctorByName(name);
        promise.then(function(response) {

        let doctorProfile = JSON.parse(response);
        console.log(name);
        console.log(doctorSearch);
        console.log(doctorProfile);

        if (doctorProfile.data.length > 0) {
        $('.showDoctor').empty();

          for(let i=0; i<doctorProfile.data.length; i++) {
            $('.showDoctors').append(
              `<div class="card"><ul><li>${doctorProfile.data[i].profile.first_name}</li>
              <li>${doctorProfile.data[i].profile.last_name}</li>
              <li>${doctorProfile.data[i].practices[0].name}</li>
              <li>${doctorProfile.data[i].practices[0].visit_address.street}<br>${doctorProfile.data[i].practices[0].visit_address.city}, ${doctorProfile.data[i].practices[0].visit_address.state} ${doctorProfile.data[i].practices[0].visit_address.zip}</li>
              <li>${doctorProfile.data[i].practices[0].phones[0].number}</li>
              <li>${doctorProfile.data[i].practices[0].website}</li>
              <li>${doctorProfile.data[i].practices[0].accepts_new_patients}</li></ul></div><br>`);

          }
        } else { ('.showDoctors').text('No doctors were found in your area that match your search.');}
        })

        // if (${doctorProfile.data[i].practices[0].accepts_new_patients} === "true"){
        //   return "Yes";
        // }


    });
    });
