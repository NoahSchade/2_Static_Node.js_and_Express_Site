// Validate the form using regular expressions.
const emptyFieldRegex = /^\s*$/;
const notLetterOrSpace = /[^A-Za-z-\s]+/;
const emailValidator = /[A-z,\d, .]+@[A-z,\d, .]+\.[A-z,\d]+/;
const creditCardValidator = /^(\d{13}|\d{14}|\d{15}|\d{16})$/;
const zipValidator = /^\d{5}$/;
const cvvValidator = /^\d{3}$/;

// Makes sure that the 'Experation Date' label goes down instead of going right when there is an error message for the credit card.
$("label[for='exp-month']").css("clear", "both");

// Focus on the name field when the page first loads.
$("#name").focus();

// The input field for 'Your Job Role is hidden when the page first loads.
const $other_title = $('#other-title');
$other_title.hide();


/* 
 When the 'Job Role' drop down menu selects a different job role, 
 the 'showHideOther' function will display the 'Your Job Role' input field if 'other' is selected
 and will hide the 'Your Job Role' input field if the 'other' job role is not selected.
*/
$("#title").change(function(){
    showHideOther();
});

function showHideOther() {
        if($("[value ='other']").is(':selected')){
            $other_title.show();
        } else {
            $other_title.hide();
        }
}

// The color label and the color drop down menu is hidden when the page first loads.
$("label[for ='color']").hide();
$("select#color").hide();


const jsPunsArr = [];
const iArr = [];


/* 
When the dessign drop down menu changes option, both the label and
drop down menu of the color section are displayed.
*/
$("#design").change(function(){
    $("label[for ='color']").show();
    $("select#color").show();
    
    for(let i = 1; i <= $("#design option").length; i++){

        /* 
        When the dessign drop down menu changes option, remove the "Select Theme" option from the design menu.
        */
        if($(`#design option:nth-child(${i})`).text() === "Select Theme"){
            $(`#design option:nth-child(${i})`).remove();
        };


        /*
        When the design drop down menu selects "Theme - JS Puns", then only the colors that match
        '(JS Puns shirt only)' are displayed in the color drop down menu.
        */
        if($(`#design option:nth-child(${i})`).filter(':selected').text() === "Theme - JS Puns") {
            const regex = /.*JS Puns.*/;
            for(let i = 1; i <= $("#color option").length; i++){
                     const $colorText = $(`#color option:nth-child(${i})`).text();
                     const $colorElement = $(`#color option:nth-child(${i})`);
                     const $colorValue = $(`#color option:nth-child(${i})`).val();
                     if($colorText.match(regex)){
                        jsPunsArr.push($colorValue);
                        $colorElement.show();
                     } else {
                        $colorElement.hide();
                     }
             }
             $("select#color").val(jsPunsArr)[0];
        }

        /*
        When the design drop down menu selects "Theme - I &#9829; JS", then only the colors that match
        '(I &#9829; JS shirt only)' are displayed in the color drop down menu.
        */
        if($(`#design option:nth-child(${i})`).filter(':selected').text().match(/.*I.*/)) {
            const regex = /.*I.*/;
            for(let i = 1; i <= $("#color option").length; i++){
                     const $colorText = $(`#color option:nth-child(${i})`).text();
                     const $colorElement = $(`#color option:nth-child(${i})`);
                     const $colorValue = $(`#color option:nth-child(${i})`).val();
                     if($colorText.match(regex)){
                        iArr.push($colorValue);
                        $colorElement.show();
                     } else {
                        $colorElement.hide();
                     }
             }
             $("select#color").val(iArr)[0];
        }
    }

});

/*
If there are two activites with the same day and time,
Disable the checkbox and gray out the label of the element that
is not checked and has the same time and day as the element that is checked.
*/
$('[type = "checkbox"]').click(function() {
    if($('[name="js-frameworks"]').is(':checked')) {
        $('[name="express"]').parent().css("color", "gray");
        $('[name="express"]').attr("disabled", "true");
        $('[name="express"]').prop('checked', false);
    } else {
         $('[name="express"]').parent().removeAttr("style");
         $('[name="express"]').removeAttr("disabled");
    }

    if($("[name = 'express']").is(':checked')) {
        $('[name="js-frameworks"]').parent().css("color", "gray");
        $('[name="js-frameworks"]').attr("disabled", "true");
        $('[name="js-frameworks"]').prop('checked', false);
    } else {
         $('[name="js-frameworks"]').parent().removeAttr("style");
         $('[name="js-frameworks"]').removeAttr("disabled");
    }

    if($("[name = 'js-libs']").is(':checked')) {
        $('[name="node"]').parent().css("color", "gray");
        $('[name="node"]').attr("disabled", "true");
        $('[name="node"]').prop('checked', false);
    } else {
         $('[name="node"]').parent().removeAttr("style");
         $('[name="node"]').removeAttr("disabled");
    }

    if($("[name = 'node']").is(':checked')) {
        $('[name="js-libs"]').parent().css("color", "gray");
        $('[name="js-libs"]').attr("disabled", "true");
        $('[name="js-libs"]').prop('checked', false);
    } else {
        $('[name="js-libs"]').parent().removeAttr("style");
        $('[name="js-libs"]').removeAttr("disabled");
    }
});

/* 
Calculate to total cost of the activities
and display it below the activities.
*/
let j = 0;
let hundred = 100;
let twoHundred = 0;
let total = 0;

$('input[type="checkbox"]').click(function() {
    if($(this).prop("checked") == true) {
        j++;
        if($('[name = "all"]').prop("checked") == true) {
            twoHundred = 100;
        }
    }
    else if($(this).prop("checked") == false) {
        j--;
        twoHundred = 0;
        if($('[name = "all"]').prop("checked") == true) {
            twoHundred = 100;
        }
    }
    console.log(cost = j * hundred + twoHundred);

    const totalText = `<h3>Total: $${cost}</h3>`;
    $(".activities").append(totalText);
    if($(".activities h3").length > 1) {
        $(".activities h3")[0].remove();
    }
});

const bitcoinRegex = /.*Bitcoin.*/;
const paypalRegex = /.*PayPal.*/;

/*
By default, hide the Bitcoin information.
By default, hide the PayPal information.
*/
for(let i = 1; i <= $("fieldset div").length; i++){
    if($(`fieldset div:nth-child(${i})`).text().match(bitcoinRegex)){
        $(`fieldset div:nth-child(${i})`).hide();
    }
    else if($(`fieldset div:nth-child(${i})`).text().match(paypalRegex)){
        $(`fieldset div:nth-child(${i})`).hide();
    }
}

// Hide the option with the text of 'Select Payment Method'.
// Select the credit card option by default.
$("option[value = 'select_method']").hide();
$("option[value = 'credit card'").attr("selected", "selected");

// When paypal is selected in the payment drop down menu,
// Show PayPal information and hide all other information in the 'Payment Info' section.
$("select#payment").change(function(){
    if($("option[value = 'paypal']").is(':selected')){
        $("#credit-card").hide();
        const bitcoinRegex = /.*Bitcoin.*/;
        const paypalRegex = /.*PayPal.*/;
        for(let i = 1; i <= $("fieldset div").length; i++){
            if($(`fieldset div:nth-child(${i})`).text().match(bitcoinRegex)){
                $(`fieldset div:nth-child(${i})`).hide();
            }
            else if($(`fieldset div:nth-child(${i})`).text().match(paypalRegex)){
                $(`fieldset div:nth-child(${i})`).show();
            }
        }       
    }
});

// When bitcoin is selected in the payment drop down menu,
// Show bitcoin information and hide all other information in the 'Payment Info' section.
$("select#payment").change(function(){
    if($("option[value = 'bitcoin']").is(':selected')){
        $("#credit-card").hide();
        const bitcoinRegex = /.*Bitcoin.*/;
        const paypalRegex = /.*PayPal.*/;
        for(let i = 1; i <= $("fieldset div").length; i++){
            if($(`fieldset div:nth-child(${i})`).text().match(paypalRegex)){
                $(`fieldset div:nth-child(${i})`).hide();
            }
            else if($(`fieldset div:nth-child(${i})`).text().match(bitcoinRegex)){
                $(`fieldset div:nth-child(${i})`).show();
            }
        }    
    }
});

// When credit card is selected in the payment drop down menu,
// Show credit card fields and hide all other information in the 'Payment Info' section.
$("select#payment").change(function(){
    if($("option[value = 'credit card']").is(':selected')){
        $("#credit-card").show();
        const bitcoinRegex = /.*Bitcoin.*/;
        const paypalRegex = /.*PayPal.*/;
        for(let i = 1; i <= $("fieldset div").length; i++){
            if($(`fieldset div:nth-child(${i})`).text().match(paypalRegex)){
                $(`fieldset div:nth-child(${i})`).hide();
            }
            else if($(`fieldset div:nth-child(${i})`).text().match(bitcoinRegex)){
                $(`fieldset div:nth-child(${i})`).hide();
            }
        }
    }      
});

// When the submit button is clicked, raise an error if name field is blank and prevent the form from submitting.
$('form').on('submit',function(e){
    const emptyFieldRegex = /^\s*$/;
    if($("#name").val().match(emptyFieldRegex)){
        e.preventDefault();
        $("#name").css("border", "3px solid red");
        $("[for = 'name']").html("Name:<span class='nameFieldBlank'>Name field should not be blank</span>");
        $(".nameFieldBlank").css("color", "red");
        $(".nameFieldBlank").css("position", "absolute");
        $(".nameFieldBlank").css("transform", "translateX(50%)");
        $("fieldset:last").append("<div class='nameBlankBox'><br><br><div id='nameBlank'>To register, you must enter a name.</div></div>");
        $("#nameBlank").css("color", "red");
        if($(".nameBlankBox").length > 1) {
            $(".nameBlankBox")[1].remove();
        }
    }
    else {
        $(".nameBlankBox").remove();
    }
})

// When the submit button is clicked, raise an error if name field is invalid and prevent the form from submitting.
$('form').on('submit',function(e){
    if($("#name").val().match(notLetterOrSpace)){
        e.preventDefault();
        $("#name").css("border", "3px solid red");
        $("[for = 'name']").html("Name:<span class='nameFieldBlank'>Name field should only contain letters and spaces</span>");
        $(".nameFieldBlank").css("color", "red");
        $(".nameFieldBlank").css("position", "absolute");
        $(".nameFieldBlank").css("transform", "translateX(20%)");
        $("fieldset:last").append("<div class='nameBlankBox'><br><br><div class='nameBlank'>To register, the name field should only contain letters and spaces</div></div>");
        $(".nameBlank").css("color", "red");
        if($(".nameBlankBox").length === 2) {
            $(".nameBlankBox")[0].remove();
        }
    } 
    else if(!$("#name").val().match(notLetterOrSpace) && !$("#name").val().match(emptyFieldRegex)) {
        $("[for = 'name']").html("Name:");
        $("#name").css("border", "none");
        $(".nameBlankBox").remove();
    }
})


// When a key is released while the name field is in focus, raise an error if the name field is blank.
$("#name").on('keyup', function(){
    if($("#name").val().match(emptyFieldRegex)){
        $("#name").css("border", "3px solid red");
        $("[for = 'name']").html("Name:<span class='nameFieldBlank'>Name field should not be blank</span>");
        $(".nameFieldBlank").css("color", "red");
        $(".nameFieldBlank").css("position", "absolute");
        $(".nameFieldBlank").css("transform", "translateX(50%)");
        $("fieldset:last").append("<div class='nameBlankBox'><br><br><div class='nameBlank'>To register, you must enter a name.</div></div>");
        $(".nameBlank").css("color", "red");
        if($(".nameBlankBox").length === 2) {
            $(".nameBlankBox")[0].remove();
        }
    } 

})

// When a key is released while the name field is in focus, raise an error if the name field is invalid.
$("#name").on('keyup', function(){
    if($("#name").val().match(notLetterOrSpace)){
        $("#name").css("border", "3px solid red");
        $("[for = 'name']").html("Name:<span class='nameFieldBlank'>Name field should only contain letters and spaces</span>");
        $(".nameFieldBlank").css("color", "red");
        $(".nameFieldBlank").css("position", "absolute");
        $(".nameFieldBlank").css("transform", "translateX(20%)");
        $("fieldset:last").append("<div class='nameBlankBox'><br><br><div class='nameBlank'>To register, the name field should only contain letters and spaces.</div></div>");
        $(".nameBlank").css("color", "red");
        if($(".nameBlankBox").length === 2) {
            $(".nameBlankBox")[0].remove();
        }
    } 
    else if(!$("#name").val().match(notLetterOrSpace) && !$("#name").val().match(emptyFieldRegex)) {
        $("[for = 'name']").html("Name:");
        $("#name").css("border", "none");
        $(".nameBlankBox").remove();
    }
});

// When a key is released while the email field is in focus, raise an error if the email field is invalid.
$("#mail").on('keyup', function(){
    if(!$("#mail").val().match(emailValidator)){
        $("#mail").css("border", "3px solid red");
        $("[for = 'mail']").html("Email:<span class='emailFieldBlank'>Invalid Email");
        $(".emailFieldBlank").css("color", "red");
        $(".emailFieldBlank").css("position", "absolute");
        $(".emailFieldBlank").css("transform", "translateX(200%)");
        $("fieldset:last").append("<div class='emailBlankBox'><br><br><div class='emailBlank'>To register, you must enter a valid email address.</div></div>");
        $(".emailBlank").css("color", "red");
        if($(".emailBlankBox").length === 2) {
            $(".emailBlankBox")[0].remove();
        }
    }     
});

// When a key is released while the email field is in focus, raise an error if the email field is blank.
$("#mail").on('keyup', function(){
    if($("#mail").val().match(emptyFieldRegex)){
        $("#mail").css("border", "3px solid red");
        $("[for = 'mail']").html("Email:<span class='emailFieldBlank'>Email field should not be blank</span>");
        $(".emailFieldBlank").css("color", "red");
        $(".emailFieldBlank").css("position", "absolute");
        $(".emailFieldBlank").css("transform", "translateX(50%)");
        $("fieldset:last").append("<div class='emailBlankBox'><br><br><div class='emailBlank'>To register, you must enter an email.</div></div>");
        $(".emailBlank").css("color", "red");
        if($(".emailBlankBox").length === 2) {
            $(".emailBlankBox")[0].remove();
        }
    } 

    else if(!$("#mail").val().match(emptyFieldRegex) && $("#mail").val().match(emailValidator)) {
        $("[for = 'mail']").html("Email:");
        $("#mail").css("border", "none");
        $(".emailBlankBox").remove();
    }
});

// When the submit button is clicked, raise an error if email field is invalid and prevent the form from submitting.
$('form').on('submit',function(e){
    if(!$("#mail").val().match(emailValidator)){
        e.preventDefault();
        $("#mail").css("border", "3px solid red");
        $("[for = 'mail']").html("Email:<span class='emailFieldBlank'>Invalid Email");
        $(".emailFieldBlank").css("color", "red");
        $(".emailFieldBlank").css("position", "absolute");
        $(".emailFieldBlank").css("transform", "translateX(200%)");
        $("fieldset:last").append("<div class='emailBlankBox'><br><br><div class='emailBlank'>To register, you must enter a valid email address.</div></div>");
        $(".emailBlank").css("color", "red");
        if($(".emailBlankBox").length === 2) {
            $(".emailBlankBox")[0].remove();
        }
    }    
});

// When the submit button is clicked, raise an error if email field is blank and prevent the form from submitting.
$('form').on('submit',function(e){
    if($("#mail").val().match(emptyFieldRegex)){
        e.preventDefault();
        $("#mail").css("border", "3px solid red");
        $("[for = 'mail']").html("Email:<span class='emailFieldBlank'>Email field should not be blank</span>");
        $(".emailFieldBlank").css("color", "red");
        $(".emailFieldBlank").css("position", "absolute");
        $(".emailFieldBlank").css("transform", "translateX(50%)");
        $("fieldset:last").append("<div class='emailBlankBox'><br><br><div class='emailBlank'>To register, you must enter an email.</div></div>");
        $(".emailBlank").css("color", "red");
        if($(".emailBlankBox").length === 2) {
            $(".emailBlankBox")[0].remove();
        }
    }
});

// When a checkbox is clicked, if no checkboxes are checked, raise an error. 
$("input[type = 'checkbox']").on('click', function(e){
    if($(".activities h3").text() === "Total: $0"){
        $(".activities").prepend("<h4>You must select atleast one activity</h4>");
        $(".activities h4").css("color", "red");
        $("fieldset:last").append("<div class='activityNoneBox'><br><br><div class='activityNone'>To register, you must select atleast one activity.");
        $(".activityNone").css("color", "red");
    } else {
        $(".activities h4").remove();
        $(".activityNoneBox").remove();
    }
    if($(".activities h4").length >= 2) {
        $(".activities h4")[0].remove();
    }
});

// When the submit button is clicked and there are no checkboxes checked, raise an error. 
$('form').on('submit',function(e){
    if($(".activities h3").text() === "Total: $0" || $(".activities h3").text() === ""){
        e.preventDefault();
        $(".activities").prepend("<h4>You must select atleast one activity</h4>");
        $(".activities h4").css("color", "red");
        $("fieldset:last").append("<div class='activityNoneBox'><br><br><div class='activityNone'>To register, you must select atleast one activity.");
        $(".activityNone").css("color", "red");
    } else {
        $(".activities h4").remove();
        $(".activityNoneBox").remove();
    }
    if($(".activities h4").length >= 2) {
        $(".activities h4")[0].remove();
        $(".activityNoneBox")[0].remove();
    }

    // Run this code only if the credit card option is selected from the drop down menu.
    // When the submit button is clicked and the credit card number field is empty or invalid, raise an error and prevent the form from being submitted.
    if ($("option[value='credit card']").is(':selected')) {
            if ($("#cc-num").val() === "") {
                e.preventDefault();
                $(".invalidWarning").remove()
                $(".creditIb").remove();
                $(".credit-card").prepend("<h4 class='invalidWarning'>Credit card field should not be blank</h4>");
                $(".credit-card h4").css("color", "red");
                $("#cc-num").css("border", "3px solid red");
                $("fieldset:last").append("<div class='creditIb'><br><br>To register, you must enter a credit card number.</div>");
                $(".creditIb").css("color", "red");
            } else if (!$("#cc-num").val().match(creditCardValidator)) {
                e.preventDefault();
                $(".invalidWarning").remove()
                $(".creditIb").remove();
                $(".credit-card").prepend("<h4 class='invalidWarning'>Invalid credit card number</h4>");
                $(".invalidWarning").css("color", "red");
                $("#cc-num").css("border", "3px solid red");
                $("fieldset:last").append("<div class='creditIb'><br><br>To register, you must enter a valid credit card number.</div>");
                $(".creditIb").css("color", "red");
            } else {
                $("#cc-num").css("border", "");
                $(".invalidWarning").remove()
                $(".creditIb").remove();
            }


        // When the submit button is clicked and the zip code field is empty or invalid, raise an error and prevent the form from being submitted.
        if ($("#zip").val() === "") {
            $(".invalidZip").remove()
            $(".zipIb").remove();
            e.preventDefault();
            $(".credit-card").prepend("<h4 class='invalidZip'>Zip code field should not be blank</h4>");
            $(".invalidZip").css("color", "red");
            $("#zip").css("border", "3px solid red");
            $("fieldset:last").append("<div class='zipIb blankCredit'><br><br>To register, you must enter a zip code.</div>");
            $(".zipIb").css("color", "red");
        } else if (!$("#zip").val().match(zipValidator)) {
            e.preventDefault();
            $(".invalidZip").remove()
            $(".zipIb").remove();
            $(".credit-card").prepend("<h4 class='invalidZip'>Invalid zip code</h4>");
            $(".invalidZip").css("color", "red");
            $("#zip").css("border", "3px solid red");
            $("fieldset:last").append("<div class='zipIb'><br><br>To register, you must enter a valid zip code.</div>");
            $(".zipIb").css("color", "red");
        } else {
            $("#zip").css("border", "");
            $(".invalidZip").remove()
            $(".zipIb").remove();
        }

        // When the submit button is clicked and the cvv field is empty or invalid, raise an error and prevent the form from being submitted.
        if ($("#cvv").val() === "") {
            $(".invalidCvv").remove()
            $(".cvvIb").remove();
            e.preventDefault();
            $(".credit-card").prepend("<h4 class='invalidCvv'>CVV field should not be blank</h4>");
            $(".invalidCvv").css("color", "red");
            $("#cvv").css("border", "3px solid red");
            $("fieldset:last").append("<div class='cvvIb blankCvv'><br><br>To register, you must enter a CVV number.</div>");
            $(".cvvIb").css("color", "red");
        } else if (!$("#cvv").val().match(cvvValidator)) {
            e.preventDefault();
            $(".invalidCvv").remove()
            $(".cvvIb").remove();
            $(".credit-card").prepend("<h4 class='invalidCvv'>Invalid CVV number</h4>");
            $(".invalidCvv").css("color", "red");
            $("#cvv").css("border", "3px solid red");
            $("fieldset:last").append("<div class='cvvIb'><br><br>To register, you must enter a valid CVV number.</div>");
            $(".cvvIb").css("color", "red");
        } else {
            $("#cvv").css("border", "");
            $(".invalidCvv").remove()
            $(".cvvIb").remove();
        }
    }
});

// Run this code only if the credit card option is selected from the drop down menu.
// When a key is released and the credit card number field is empty or invalid, raise an error.
$("#cc-num").on('keyup', function(e){
    if ($("option[value='credit card']").is(':selected')) {
        if ($("#cc-num").val() === "") {
            $(".invalidWarning").remove()
            $(".creditIb").remove();
            $(".credit-card").prepend("<h4 class='invalidWarning'>Credit card field should not be blank</h4>");
            $(".credit-card h4").css("color", "red");
            $("#cc-num").css("border", "3px solid red");
            $("fieldset:last").append("<div class='creditIb'><br><br>To register, you must enter a credit card number.</div>");
            $(".creditIb").css("color", "red");
        } else if (!$("#cc-num").val().match(creditCardValidator)) {
            $(".invalidWarning").remove()
            $(".creditIb").remove();
            $(".credit-card").prepend("<h4 class='invalidWarning'>Invalid credit card number</h4>");
            $(".invalidWarning").css("color", "red");
            $("#cc-num").css("border", "3px solid red");
            $("fieldset:last").append("<div class='creditIb'><br><br>To register, you must enter a valid credit card number.</div>");
            $(".creditIb").css("color", "red");
        } else {
            $("#cc-num").css("border", "");
            $(".invalidWarning").remove()
            $(".creditIb").remove();
        }
    }
});

// Run this code only if the credit card option is selected from the drop down menu.
// When a key is released and the zip code field is empty or invalid, raise an error.
$("#zip").on('keyup', function(e){
    if ($("option[value='credit card']").is(':selected')) {
        if ($("#zip").val() === "") {
            $(".invalidZip").remove()
            $(".zipIb").remove();
            $(".credit-card").prepend("<h4 class='invalidZip'>Zip code field should not be blank</h4>");
            $(".invalidZip").css("color", "red");
            $("#zip").css("border", "3px solid red");
            $("fieldset:last").append("<div class='zipIb blankCredit'><br><br>To register, you must enter a zip code.</div>");
            $(".zipIb").css("color", "red");
        } else if (!$("#zip").val().match(zipValidator)) {
            $(".invalidZip").remove()
            $(".zipIb").remove();
            $(".credit-card").prepend("<h4 class='invalidZip'>Invalid zip code</h4>");
            $(".invalidZip").css("color", "red");
            $("#zip").css("border", "3px solid red");
            $("fieldset:last").append("<div class='zipIb'><br><br>To register, you must enter a valid zip code.</div>");
            $(".zipIb").css("color", "red");
        } else {
            $("#zip").css("border", "");
            $(".invalidZip").remove()
            $(".zipIb").remove();
        }
    }
});

// Run this code only if the credit card option is selected from the drop down menu.
// When a key is released and the CVV field is empty or invalid, raise an error.
$("#cvv").on('keyup', function(e){
    if ($("option[value='credit card']").is(':selected')) {
        if ($("#cvv").val() === "") {
            $(".invalidCvv").remove()
            $(".cvvIb").remove();
            $(".credit-card").prepend("<h4 class='invalidCvv'>CVV field should not be blank</h4>");
            $(".invalidCvv").css("color", "red");
            $("#cvv").css("border", "3px solid red");
            $("fieldset:last").append("<div class='cvvIb blankCvv'><br><br>To register, you must enter a CVV number.</div>");
            $(".cvvIb").css("color", "red");
        } else if (!$("#cvv").val().match(cvvValidator)) {
            $(".invalidCvv").remove()
            $(".cvvIb").remove();
            $(".credit-card").prepend("<h4 class='invalidCvv'>Invalid CVV number</h4>");
            $(".invalidCvv").css("color", "red");
            $("#cvv").css("border", "3px solid red");
            $("fieldset:last").append("<div class='cvvIb'><br><br>To register, you must enter a valid CVV number.</div>");
            $(".cvvIb").css("color", "red");
        } else {
            $("#cvv").css("border", "");
            $(".invalidCvv").remove()
            $(".cvvIb").remove();
        }
    }
});

// When the payment option in the drop down menu selects bitcoin or PayPal, remove all the error messages related to the credit card.
$("select#payment").on('change', function() {
   if (!$("option[value='credit card']").is(':selected')) {
        $(".invalidCvv").remove();
        $(".invalidZip").remove();
        $(".invalidWarning").remove();
        $(".creditIb").remove();
        $(".zipIb").remove();
        $(".cvvIb").remove();
   };

});