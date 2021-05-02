$(function(){
     var name,age,city,gender;
    $("#addbtn").on("click",handleAddBtnClick);
    $("#resetbtn").on("click",resetForm);
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
            $("#tbody").append("<tr><td id="+"added_name"+">"+name+"</td><td id="+"added_gender"+">"+gender+"</td><td id="+"added_age"+">"+age+"</td><td id="+"added_city"+">"+city+"</td><td><a href="+"#"+" id="+"updatelink"+">"+"Update/"+"</a><a href="+"#"+" id="+"removelink"+">"+" Remove"+"</a></td></tr>");
        $('a').css('color','black');
            $("a").click(updateOnTable);
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
    $("#name").val("")
    $("#age").val("");
     $("#select option:selected").val("Select City");
     $("#select").val("Select City");
     $("input[name=gender]").prop('checked', false);
}
function updateOnTable(){
    var id=$(this).attr('id');
    var $sname = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find("#added_name")     // Gets a descendent with class="nr"
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

    if(id=="updatelink")
    {
        
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
         $(this).parent().parent().remove();
    }
    var $td=$(this);
    var row=$(this).closest("tr");
    $("#updatebtn").on("click",function(){

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
    console.log("inside currentAge()");
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
    console.log("inside currentName()");
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
