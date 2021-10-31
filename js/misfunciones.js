/**
 * FUNCIONES DE LA TABLA CATEGORÍA
 */
function consultarCategory(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.125.224:8080/api/Category/all",
        //url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            obtRespuestaCategory(respuesta);
            let $select = $("#select-category"); ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    
    })

}
function  obtRespuestaCategory(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        //myTable+="<td>"+respuesta[i].room.hotel+"</td>";
        myTable+="<td> <button onclick=' actualizarCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val(),
        //room: {id:+$("#select-room").val()},
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.125.224:8080/api/Category/save",
        //url:"http://localhost:8080/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val(),
       // room: {id:+$("#select-room").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Category/update",
        //url:"http://localhost:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            $("#select-room").val("");
            consultarCategory();
            alert("se ha Actualizado correctamente la categoria")
        }
    });

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Category/"+idElemento,
        //url:"http://localhost:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            consultarCategory();
            alert("Se ha Eliminado.")
        }
    });

}
/**
 * FUNCIONES DE LA TABLA ROOM
 */

function consultarRoom(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.125.224:8080/api/Room/all",
        //url:"http://localhost:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            obtRespuestaRoom(respuesta);
            let $select = $("#select-room"); ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            });  
        }
    
    })

}
function obtRespuestaRoom(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].hotel+"</td>";
        myTable+="<td>"+respuesta[i].stars+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>"; ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
        //myTable+="<td>"+respuesta[i].messageText.messageText+"</td>";
        myTable+="<td> <button onclick=' actualizarRoom("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick=' borrarRoom("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarRoom(){
    let var2 = {
        name:$("#Rname").val(),
        hotel:$("#Rhotel").val(),
        stars:$("#Rstars").val(),
        description:$("#Rdescription").val(),
        category: {id:+$("#select-category").val()}, ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
        message: {id:+$("#select-message").val()},
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.125.224:8080/api/Room/save",
        //url:"http://localhost:8080/api/Room/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarRoom(idElemento){
    let myData={
        id:idElemento,
        name:$("#Rname").val(),
        hotel:$("#Rhotel").val(),
        stars:$("#Rstars").val(),
        description:$("#Rdescription").val(),
        category: {id:+$("#select-category").val()},   ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
        message: {id:+$("#select-message").val()},


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Room/update",
        //url:"http://localhost:8080/api/Room/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#id").val("");
            $("#Rname").val("");
            $("#Rhotel").val("");
            $("#Rstars").val("");
            $("#Rdescription").val("");
            $("#select-category").val("");                  ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
            $("#select-message").val("");
            consultarRoom();
            alert("se ha Actualizado correctamente Room")
        }
    });

}

function borrarRoom(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Room/"+idElemento,
        //url:"http://localhost:8080/api/Room/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            consultarRoom();
            alert("Se ha Eliminado.")
        }
    });

}
/**
 * FUNCIONES DE LA TABLA CLIENTE
 */

function consultarCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.125.224:8080/api/Client/all",
        //url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            obtenerCliente(respuesta);
            let $select = $("#select-client"); 
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}
function obtenerCliente(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarCliente(){
    let var2 = {
        
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.125.224:8080/api/Client/save",
        //url:"http://localhost:8080/api/Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Client/update",
        //url:"http://localhost:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            consultarCliente();
            alert("se ha Actualizado correctamente Cliente")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Client/"+idElemento,
        //url:"http://localhost:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            consultarCliente();
            alert("Se ha Eliminado.")
        }
    });

}
/**
 * FUNCIONES DE LA TABLA MESSAGE
 */
 function consultarMessage(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.125.224:8080/api/Message/all",
        //url:"http://localhost:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            obtTablaMessage(respuesta);
            let $select = $("#select-message"); 
            $.each(respuesta, function (id, messageText) {
                $select.append('<option value='+messageText.id+'>'+messageText.messageText+'</option>');
                console.log("select "+messageText.id);
            }); 
        }
    
    })

}
function obtTablaMessage(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";       
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick=' actualizarMessage("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMessage("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarMessage(){
    let var2 = {
        messageText:$("#MmessageText").val()   
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.125.224:8080/api/Message/save",
        //url:"http://localhost:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarMessage(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#MmessageText").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Message/update",
        //url:"http://localhost:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            $("#idMessage").val("");
            $("#MmessageText").val("");
            consultarMessage();
            alert("se ha Actualizado correctamente Message")
        }
    });

}

function borrarMessage(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Message/"+idElemento,
        //url:"http://localhost:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            consultarMessage();
            alert("Se ha Eliminado.")
        }
    });
}
/**
 * FUNCIONES DE LA TABLA RESERVATION
 */
 function consultarReservation(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.125.224:8080/api/Reservation/all",
        //url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            obtenerReservation(respuesta);
            let $select = $("#select-Reservation"); ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
            $.each(respuesta, function (id, startDate) {
                $select.append('<option value='+startDate.id+'>'+startDate.startDate+'</option>');
                console.log("select "+startDate.id);
            }); 
        }
    
    })

}
function obtenerReservation(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>"; 
        myTable+="<td>"+respuesta[i].client.name+"</td>";////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
        myTable+="<td>"+respuesta[i].room.name+"</td>";
        myTable+="<td> <button onclick=' actualizarReservation("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick=' borrarReservation("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function guardarReservation(){
    let var2 = {
        startDate:$("#RestartDate").val(),
        devolutionDate:$("#RedevolutionDate").val(),
        client: {id:+$("#select-client").val()}, ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
        room: {id:+$("#select-room").val()},
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.125.224:8080/api/Reservation/save",
        //url:"http://localhost:8080/api/Reservation/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarReservation(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#RestartDate").val(),
        devolutionDate:$("#RedevolutionDate").val(),
        client: {id:+$("#select-client").val()},   ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
        room: {id:+$("#select-room").val()},


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Reservation/update",
        //url:"http://localhost:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado5").empty();
            $("#idReservation").val("");
            $("#RestartDate").val("");
            $("#RedevolutionDate").val("");
            $("#select-client").val("");  ////// ESTO ES LO QUE PERMITE CONECTAR UNO CON EL OTRO  //////
            $("#select-room").val("");
            consultarReservation();
            alert("se ha Actualizado correctamente Reservation")
        }
    });

}

function borrarReservation(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.125.224:8080/api/Reservation/"+idElemento,
        //url:"http://localhost:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado5").empty();
            consultarReservation();
            alert("Se ha Eliminado.")
        }
    });
}
/**
 * PARTE DE STATUS 
 */
 function traerReporteStatus(){
    $.ajax({
        url:"http://129.151.125.224:8080/api/Reservation/report-status",
        //url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){
    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
  console.log(fechaInicio);
  console.log(fechaCierre);

    $.ajax({
        url:"http://129.151.125.224:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        //url:"http://localhost/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaDate(respuesta);
        }
    });
}
function pintarRespuestaDate(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>total</th>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
      
      
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoDate").html(myTable);
}

function traerReporteClientes(){
    $.ajax({
        url:"http://129.151.125.224:8080/api/Reservation/report-clients",
        //url:"http://localhost/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}
function pintarRespuestaClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>total</th>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
      
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}