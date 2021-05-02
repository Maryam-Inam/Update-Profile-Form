$(function(){
     var name,age,city,gender;
    $("#addbtn").on("click",handleAddBtnClick);
    $("#resetbtn").on("click",resetForm);
    var enRemovelink=true;
    $("a").click(updateOnTable);
    $("#addbtn").removeClass('disabled');
    $("#updatebtn").addClass('disabled');
});
function handleAddBtnClick(){
    if(!($("#addbtn").hasClass('disabled')))
    {
        name=$("#name").val();
        age=$("#age").val();
        city=$("#select option:selected").val();
        gender = $("input[type='radio']:checked").val();
        $('#age').parent().find("#spa").remove();
        $('#name').parent().find("#spn").remove();
        if(checkInput()){
            $("#age").removeClass("error")
            $("#name").removeClass("error")
            $("#tbody").append("<tr><td id="+"added_name"+">"+name+"</td><td id="+"added_gender"+">"+gender+"</td><td id="+"added_age"+">"+age+"</td><td id="+"added_city"+">"+city+"</td><td><a href="+"#"+" class="+"updatelink"+">"+"Update/"+"</a><a href="+"#"+" class="+"removelink"+">"+" Remove"+"</a></td></tr>");
        $('a').css('color','black');
        enRemovelink=true;
            $("a").click(updateOnTable);
        resetForm();
        }
        else{return;}
    }
    else{
        return;
    }
     
}
function resetForm(){
    /* enabling add button */
     if($("#addbtn").hasClass('disabled')){
        $("#addbtn").removeClass('disabled');
    }
    /* disabling update button */
    if(!($("#updatebtn").hasClass('disabled'))){
        $("#updatebtn").addClass('disabled');
    }

    /* resetting values */
    $('#age').parent().find("#spa").remove();
    $('#name').parent().find("#spn").remove();
    $("#age").removeClass("error")
    $("#name").removeClass("error")
    $("#name").val("")
    $("#age").val("");
     $("#select option:selected").val("Lahore");
     $("#select").val("Lahore");
     $("input[name='gender'][value='Male']").prop('checked', true);
}
function updateOnTable(){
    var $sname = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find("#added_name")     // Gets a descendent with id="added_name"
                       .text();      
    var $sgender = $(this).closest("tr") 
                       .find("#added_gender")   
                       .text();         
    var $sage = $(this).closest("tr") 
                       .find("#added_age")  
                       .text();         
    var $scity = $(this).closest("tr") 
                       .find("#added_city") 
                       .text();         
    
    if($(this).hasClass("updatelink"))
    {
        $('.removelink').removeAttr('href');
        enRemovelink=false;
        
        /* enabling update button */
     $("#updatebtn").removeClass('disabled');
    /* Disabling add button */
     $("#addbtn").addClass('disabled');

     /* data transfer from table to form */
    $("#name").val($sname)
    $("#age").val($sage);
     $("#select option:selected").val($scity);
     $("#select").val($scity);
     $("input[value="+$sgender+"]").prop('checked', true);
     oldname=$sname;
    }
    else
    {
        if(enRemovelink==true){
            $(this).parent().parent().remove();
        }
    }
    var row=$(this).closest("tr");
    $("#updatebtn").unbind().click(function(){

        if(!($("#updatebtn").hasClass('disabled'))){
            $('#age').parent().find("#spa").remove();
        $('#name').parent().find("#spn").remove();
        if(checkInput()){
            $("#age").removeClass("error")
            $("#name").removeClass("error")
            row.find("td:eq(0)").text($("#name").val());
            row.find("td:eq(1)").text($("input[type='radio']:checked").val());
            row.find("td:eq(2)").text($("#age").val());
            row.find("td:eq(3)").text($("#select option:selected").val());
            $('.removelink').attr('href','#');
            enRemovelink=true;
            resetForm();
        }
        else{
            return;
        }

        }
        else{
            return;
        }
    });
    
}
function checkInput(){
    var bool=true;
    if(!correctAge()){
        bool=false
    }
    if(!correctName()){
        return false;
    }
    return bool;
}
function correctAge(){
    var givenAge=$("#age").val();
     if(!($.isNumeric(givenAge)) && !!givenAge)
     {
      $("#age").addClass("error")
    $('#age').parent().append('<span id="spa">Age should be a numeric value.</span>');
        return false;
  }
    if((givenAge<10 && !!givenAge) || givenAge>50)
{
    $("#age").addClass("error")
    $('#age').parent().append('<span id="spa">Age should be between 10 and 50 only.</span>');
    return false;
}
    if(!(givenAge)){
    $("#age").addClass("error")
    $('#age').parent().append('<span id="spa">Field can not be left empty.</span>');
    return false;
}
 $("#age").removeClass("error")
return true;
}
function correctName(){
        var wrongexp= new RegExp('[^A-Za-z]');
        var givenName=$("#name").val();
if(givenName.match(wrongexp) && !!givenName)  
{
    $("#name").addClass("error")
    $('#name').parent().append('<span id="spn">Name should be in upper or lower case only.Also no space allowed!</span>');
    return false;
}
if(givenName.length>10){
    $("#name").addClass("error")
    $('#name').parent().append('<span id="spn">Name must not exceed 10 alphabets.</span>');
    return false;
}
if(!givenName){
    $("#name").addClass("error")
    $('#name').parent().append('<span id="spn">Field can not be left empty.</span>');
    return false;
}
 $("#name").removeClass("error")
return true;
}
