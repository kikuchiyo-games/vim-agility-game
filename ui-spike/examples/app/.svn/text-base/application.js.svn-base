// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
//Ajax.InPlaceEditorWithEmptyText = Class.create(Ajax.InPlaceEditor, {
//
//    initialize : function($super, element, url, options) {
//        if (typeof options == 'undefined')
//            options = {}
//        if (!options.emptyText) options.emptyText = "click to edit...";
//        if (!options.emptyClassName) options.emptyClassName = "inplaceeditor-empty";
//
//        $super(element, url, options);
//
//        this.checkEmpty();
//    },
//
//    checkEmpty : function() {
//
//        if (this.element.innerHTML.length == 0 && this.options.emptyText) {
//
//            this.element.appendChild(
//                new Element("span", {
//                    className : this.options.emptyClassName
//                }).update(this.options.emptyText)
//                );
//        }
//
//    },
//
//    getText : function($super) {
//
//        if (empty_span = this.element.select("." + this.options.emptyClassName).first()) {
//            empty_span.remove();
//        }
//
//        return $super();
//
//    },
//
//    onComplete : function($super, transport) {
//
//        this.checkEmpty();
//        return $super(transport);
//
//    },
//
//    wrapUp : function($super, transport) {
//        $super(transport)
//        this.checkEmpty();
//    }
//
//});



/* Determine if browser is less than or equal to IE 7 */
function isLTE_IE7() {
		var isIE = (navigator.appName=="Microsoft Internet Explorer");
		var IEversion = navigator.appVersion;
		if(isIE) {
			IEversion = parseInt(IEversion.substr(IEversion.indexOf("MSIE")+4));
			if (IEversion >= 7) {
				return true;
			}
			else  {
				return false;
			}
		} 
		else {
			return false;
		}
}

/* Reset password button*/
function disable_and_enable_update_button(value){
    $("#password_submit").attr('disabled',value);
}

/* Validate password similiar to Flex client style*/
function validate_password(caller_method){
    var caps_regex = /[A-Z]/;
    var num_regex = /[0-9]/;
    var spcl_regex = /[\x20-\x2F]|[\x3A-\x40]|[\x5B-\x60]|[\x7B-\x7E]/;
    var success_value = 0;

    if(caller_method == "create_user"){
        var password_length=$('#user_contact_user_attributes_password').val().length;
        var password_value=$('#user_contact_user_attributes_password').val();
        check_password_against_regexes(password_length,password_value)
        if (success_value==4) {
            $('#user_contact_user_attributes_password').css('border','1px solid green');
            $('#password_field, #password_error_row').css('background-color','');
            $('tr#password_error_row').hide();
            return true;
        }
        else {
            $('#user_contact_user_attributes_password').css('border','1px solid red');
            if (password_length ==0)  {
                $('tr#password_error_row').hide();
                $('#user_contact_user_attributes_password').css('border','');
            }
            return false;
        }
    }
    else {
        var password_length=$('#password').val().length;
        var password_value=$('#password').val();
        var password_confirm_value=$('#password_confirmation').val();
        check_password_against_regexes(password_length,password_value)

        if (password_value==password_confirm_value )
            hide_hint("password_match","green",1, caller_method);
        else
            show_hint("password_match","red",-1, caller_method);

        if (password_value=="" && password_confirm_value=="") {
            $('#no_of_characters').hide();
            $('#include_uppercase').hide();
            $('#include_number').hide();
            $('#include_special_character').hide();
            $('#password_match').hide();
            $('li').css( 'background','none');
        }
        if (success_value==5)
            disable_and_enable_update_button(false);
        else
            disable_and_enable_update_button(true);
    }

    function check_password_against_regexes(password_len,password_val){
        if(password_len >= 6 )
            hide_hint("no_of_characters","green",1);
        else
            show_hint("no_of_characters","red",-1);

        if (password_val.match(caps_regex))
            hide_hint("include_uppercase","green",1);
        else
            show_hint("include_uppercase","red",-1);

        if (password_val.match(num_regex))
            hide_hint("include_number","green",1);
        else
            show_hint("include_number","red",-1);

        if (password_val.match(spcl_regex))
            hide_hint("include_special_character","green",1);
        else
            show_hint("include_special_character","red",-1);
    }

    function show_hint(id,color,value) {
        if(caller_method == "change_pwd"){
            $('#'+id).show();
            $('#'+id).css('color',''+color);
            if (color=="red")
                $('#'+id).css('background','none');
            else
                $('#'+id).css('background', 'url(/images/green_checkmark.png) right center no-repeat');
        }
        else {
            $('#password_error_row,#password_hint,li#'+id).show();
        }
        success_value=(success_value+value);
    }

    function hide_hint(id,color, value) {
        if(caller_method == "change_pwd"){
            $('#'+id).show();
            $('#'+id).css('color',''+color);
            if (color=="red")
                $('#'+id).css('background','none');
            else
                $('#'+id).css('background', 'url(/images/green_checkmark.png) right center no-repeat');
        }
        else {
            $('li#'+id).hide();
        }
        success_value=(success_value+value);
    }
}

function update_locale(login_header,username,password,remember,submit,forgot_password,forgot_username,controller,locale)
{
    $('#login').html(login_header);
    $('#username').html(username);
    $('#password').html(password);
    $('#submit').val(submit);
    $('#locale').val(locale);
    
    if (controller=="service")
    {
        $('#remember').html(remember);
        $('#forgot_pword').text(forgot_password);
        $('#forgot_uname').text(forgot_username);
    }
}

function update_local_text(p_title_text, new_p_text, confirm_p_text,update_button_text, no_of_chars_err,uppercase_err,number_err,spec_char_err,confirmation_err ){
    $('#password_title').html(p_title_text);
    $('#new_password').html(new_p_text);
    $('#new_password_confirmation').html(confirm_p_text);
    $('#password_submit').val(update_button_text);
    $('li#no_of_characters').html(no_of_chars_err);
    $('li#include_uppercase').html(uppercase_err);
    $('li#include_number').html(number_err);
    $('li#include_special_character').html(spec_char_err);
    $('li#password_match').html(confirmation_err);
}

/*
* To disable copy/paste in for password fields in verifications_token/reset_password
**/
var ctrlFlag = false;
function noKeyPaste(e) {
    if((e.keyCode?e.keyCode:e.which)==17)   {
        ctrlFlag=true;
        return false;
    }
    else if(ctrlFlag)    {
        return false;
    }
    else
        return true;
}
function resetCtrl(e)  {
    if((e.keyCode?e.keyCode:e.which)==17)
        ctrlFlag=false;
}

function validatePasswordDisableCopyPaste(e){
    resetCtrl(e);
    validate_password();
}



//$(document).ready(function($) {
//    $('a[rel*=facebox]').facebox({
//        loading_image : '/images/facebox/loading.gif',
//        close_image   : '/images/facebox/closelabel.gif'
//    });
//});

// number format function
function numberFormat(nStr,prefix){
	  if (isNaN(parseInt(nStr))) {
			return '-';
		}
		
    var prefix = prefix || '';
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return prefix + x1 + x2;
}

function valueOrDash(value) {
    return value || '-';
}


