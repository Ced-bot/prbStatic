var Aux="";
 var filaI =0;
var pagina=1;
var aux_tipoCambio="";

var id_filtro_global=0;
var items_por_pagina_global=25;

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

 var validate = function (e) {
              var t = e.value;
              e.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
            }
  function abrir_modal_edicion(url)
    {
        $('#edicion').load(url,function(){
        $(this).modal('show');
        });
        /*$('#edicion').modal('show');*/

    }
    function abrir_modal_creacion(url)
    {
        $('#creacion').load(url,function(){
        $(this).modal('show');
        });
        /*$('#edicion').modal('show');*/

    }
    function abrir_modal_eliminacion(url)
    {
        $('#modal_eliminacion').load(url,function(){
        $(this).modal('show');
        });
        /*$('#edicion').modal('show');*/

    }
    function abrir_modal_detalle(url)
    {
        $('#modal_detalle_actividad').load(url,function(){
        $(this).modal('show');
        });
        /*$('#edicion').modal('show');*/

    }
    function abrir_modal_precio(url)
    {
        $('#modal_precio').load(url,function(){
        $(this).modal('show');
        });
        
        /*$('#edicion').modal('show');*/

    }

    function abrir_modal_actividad_resuelta(url)
    {
        $('#modal_actividad_resuelta').load(url,function(){
        $(this).modal('show');
        });
        
        /*$('#edicion').modal('show');*/

    }
    function cerrar_modal_detalle()
    {
        $('#modal_detalle_actividad').modal('hide');

    }
    function cerrar_modal_creacion()
    {
        $('#creacion').modal('hide');

    }
    function cerrar_modal_edicion()
    {
        $('#edicion').modal('hide');      
        
    }
    function cerrar_modal_eliminacion()
    {
        $('#modal_eliminacion').modal('hide');      
        
    }
 
    function cerrar_modal_precio()
    {
        $('#modal_precio').modal('hide');      
        
    }
    function cerrar_modal_respuesta()
    {
        $('#modal_actividad_resuelta').modal('hide');      
        
    }
    function activarBoton(){
        if($('#boton_creacion').prop('disabled')){
            $('#boton_creacion').prop('disabled',false);
        }else{
            $('#boton_creacion').prop('disabled', true);
        }
    }
   function boton_refrescar_tabla(){
       
       page=getUrlParameter('page')
       id_filtro_global = 0
       items_por_pagina_global=25
       //var valor_seleccionado=$('#items_por_pagina option:selected').val('25');
       $('select').prop('selectedIndex', 0);
       $("[name='fecha_solicitud_inicio']").val('');
       $("[name='fecha_solicitud_final']").val('');
       $('#filtro_codigo_alumno_estado').val('');;
       
       ajax_cargar_actividades(1)
       //location.href = "http://localhost:8000/asesor_fbv/";
      // location.href = "/{% url 'asesor_fbv:formulario_asesor' %}/";
       
        //location.reload(true);
        //listado_asesor_actividades(); 
    }
  
   

function listado_asesor_actividades(){

    $.ajax({
        url:"/asesor_fbv/",
        type:"get",
        data:{'page':getUrlParameter('page')}, 
        dataType:'json',
        success:function(response)
        {
            Aux=response;
            console.log(Aux);
            /*borrar la informacion del tbody*/
            $('#tabla_actividad_asesor tbody').html("");
            for(let i=0 ; i<response.length;i++){
                /*let fila='<tr data-toggle="modal" data-target="#modalActividadesPA" class="filaC" id="'+i+'" >';*/
                let fila='<tr>';
                fila +='<td>'+response[i].codigo_alumno+'</td>';
                fila +='<td>'+response[i].fecha_solicitud+'</td>';
                fila +='<td>'+response[i].curso+'</td>';
                fila +='<td>'+response[i].fecha_entrega+'</td>';
                fila +='<td><button class="boton-detalle" type="button"  onclick = "abrir_modal_detalle(\'/asesor_fbv/actividad_detalle/' + response[i].actividad_id + '/\');"> Link Actividad</button></td>';
                fila +='<td><button class="boton-precio" type="button"  onclick = "abrir_modal_precio(\'/asesor_fbv/actividad_precio/' + response[i].actividad_id + '/\');"> Completar Precio </button></td>';
                fila +='<td>'+response[i].estado_tarea+'</td>';
                fila +='<td><button class="boton-actividad" type="button"  onclick = "abrir_modal_actividad_resuelta(\'/asesor_fbv/actividad_resuelta/' + response[i].actividad_id + '/\');">Activididad Resuelta</button></td>';
                fila +='<td><button class="btn btn-primary btn-sm" type="button"  onclick = "abrir_modal_edicion(\'/asesor_fbv/actividad_update/' + response[i].actividad_id + '/\');"> EDITAR </button>';
                fila+='<button name="bton 2"class="btn btn-danger btn-sm" type="button"  onclick = "abrir_modal_eliminacion(\'/asesor_fbv/actividad_delete/' + response[i].actividad_id + '/\');"> ELIMINAR </button></td>';
                fila+='</tr>';

                $('#tabla_actividad_asesor tbody').append(fila);

            }

        },
        error:function(error)
        {
            console.log(error);

        }
    });     
}

function ajax_cargar_actividades(pag=1){
    var data = new FormData();
    var valor_seleccionado=items_por_pagina_global;
 
    data.append('valor_seleccionado',valor_seleccionado);  
    data.append("page", pag);
    $.ajax(
    {
        url:"/asesor_fbv/actividad_list/",
        type:'POST',
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: data,
        success: function(result){
        $("#bloque_actividades").html(result);
        },
        error: function (error) 
        {
            alert(error);
        }
    });
}
 function obtener_items_por_pagina() {
            //var id_filtro=$("[id='id_filtro']").val();

            // var id_filtro=id_filtro_global;
            // alert($('#items_por_pagina option:selected').val());
            var selecionado = $('#items_por_pagina option:selected').val();

        
            console.log('--item pagina--------------')
            console.log(selecionado)
            console.log('----------------')

            if (id_filtro_global == 1) {
                console.log('--entro filtro 1--------------')
                console.log(id_filtro_global)
                console.log('----------------')
                //id_filtro_global=1;
                filtrar_fecha_solicitud();
                return 0;

            }

            if (id_filtro_global == 2) {
                 console.log('--entro filtro 2--------------');
                console.log(id_filtro_global);
                console.log('----------------');
                //id_filtro_global=2;
                page = getUrlParameter('page');
                busqueda_por_columnas(page);
                return 0;
               

            }

            else 
            {
                console.log('--entro filtro 0--------------')
                console.log(id_filtro_global)
                console.log('----------------');
                //id_filtro_global = 0
                //page = getUrlParameter('page');
                items_por_pagina_global=$('#items_por_pagina option:selected').val()
                ajax_cargar_actividades();

            }
            return 0;


}

function VerificarFechaDeSolicitud(fecha_solicitud_inicio,fecha_solicitud_final) 
  {     
            if ((fecha_solicitud_inicio == null || fecha_solicitud_inicio == "") & (fecha_solicitud_final == null || fecha_solicitud_final == "") ) 
            {
              //swal("ERROR",'No se ha indicado la fecha de solicitud', "error");
              return false;
            }
            else 
            {
              //swal("Listo","Se guardaron los datos de la solicitud", "success");
              return true;
            }

    }
function ajax_cargar_actividades_filtradas(pag=1){

    //id_filtro_global=1;
    console.log('---------filtro paginado----------')
    fecha_solicitud_inicio =$("[name='fecha_solicitud_inicio']").val();
    fecha_solicitud_final=$("[name='fecha_solicitud_final']").val();
  
    var valor_seleccionado=$('#items_por_pagina option:selected').val();
   
    var data = new FormData();
    data.append("page", pag);
    data.append('fecha_solicitud_inicio',fecha_solicitud_inicio);
    data.append('fecha_solicitud_final',fecha_solicitud_final);
    data.append('valor_seleccionado',valor_seleccionado);  
    var filtro_ajax=1;
    data.append('filtro_ajax',filtro_ajax);
      $.ajax(
      {url:"/asesor_fbv/fecha_solicitud/",
        type:'POST',
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: data,
        success: function(result){

            console.log('--entro actividades filtradas --------------')
            console.log(id_filtro_global)
            console.log('----------------')
            $("#bloque_actividades").html("");  
            $("#bloque_actividades").html(result);
        },
        error: function (error) {
          alert(error);
        }
      });
}

function busqueda_por_columnas(page=1){

    console.log( $("#filtro_codigo_alumno_estado").val());
    texto=$("#filtro_codigo_alumno_estado").val();
    valor_seleccionado=$('#items_por_pagina option:selected').val();
    if(texto!="")
    {

        var data = new FormData();
        //page=getUrlParameter('page')
        data.append('page',page);
        data.append('texto',texto);
        data.append('valor_seleccionado',valor_seleccionado); 
         $.ajax({
            url:"/asesor_fbv/busqueda_por_columnas/",
            type:'POST',
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            data:data,
            success:function(result)
            {
            // cargar_formulario_asesor()
                //location.href = "http://localhost:8000/asesor_fbv/";
                id_filtro_global=2;
                console.log(id_filtro_global);
                $("#bloque_actividades").html("");  
                $("#bloque_actividades").html(result);       

            },
            error:function(error)
            {
                console.log(error);

            }
        });  



    }
    else{
         id_filtro_global=0
         obtener_items_por_pagina();
         return 0;

    }
   
} 
function filtrar_fecha_solicitud(){

    valor_seleccionado=$('#items_por_pagina option:selected').val();
    fecha_solicitud_inicio =$("[name='fecha_solicitud_inicio']").val();
    fecha_solicitud_final=$("[name='fecha_solicitud_final']").val();
    //console.log(fecha_solicitud_inicio);
   // console.log(fecha_solicitud_final);
    console.log('------pagina-------------')
    //console.log(getUrlParameter('page'))
    console.log('-------entro filtrar_fecha------------')
    console.log(id_filtro_global);
    console.log('-------------------')
    if(VerificarFechaDeSolicitud(fecha_solicitud_inicio,fecha_solicitud_final)){

        var data = new FormData();
        page=getUrlParameter('page')
        data.append('page',page);
        data.append('fecha_solicitud_inicio',fecha_solicitud_inicio);
        data.append('fecha_solicitud_final',fecha_solicitud_final);
        data.append('valor_seleccionado',valor_seleccionado); 

        var filtro_ajax=1;

        data.append('filtro_ajax',filtro_ajax);
        /*if(getUrlParameter('page')==1){
            page=0
        }
        console.log(page)*/
        $.ajax({
            url:"/asesor_fbv/fecha_solicitud/",
            type:'POST',
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            data:data,
            success:function(result)
            {
            // cargar_formulario_asesor()
                //location.href = "http://localhost:8000/asesor_fbv/";
                id_filtro_global=1;
                console.log(id_filtro_global);
                $("#bloque_actividades").html("");  
                $("#bloque_actividades").html(result);       

            },
            error:function(error)
            {
                console.log(error);

            }
        });     


    }
    else{

        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Filtros no ingresados!',
                })
       
    }
    // $("[name='fecha_solicitud_inicio']").focus();
   
}

function cargar_formulario_asesor(){
   
    
    /*if(getUrlParameter('page')==1){
        page=0
    }
    console.log(page)*/   
    $.ajax({
        url:"/asesor_fbv/",
        type:"GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        success:function(response)
        {
            console.log('formulario cargado')
            //location.href = "http://localhost:8000/asesor_fbv/";

        },
        error:function(error)
        {
            console.log(error);

        }
    });     
}

function registrar(){
    activarBoton();
    $.ajax({     
        url:$('#form_creacion').attr('action'),
        type: $('#form_creacion').attr('method'),
        data:$('#form_creacion').serialize(), 
        success:function(response)
        {
            console.log(response); 
            notificacionSuccess(response.mensaje);
            listado_asesor_actividades();
            cerrar_modal_creacion();
        },
        error:function(error)
        {
           notificacionError(error.responseJSON.mensaje);
           mostrarErroresCreacion(error);
           activarBoton();

        }
    });     
}

function editar(){
   /*console.log( $('#form_edicion').serialize());*/
   console.log('ajax editar')
    activarBoton();
    $.ajax({     
        url:$('#form_edicion').attr('action'),
        type: $('#form_edicion').attr('method'),
        data:$('#form_edicion').serialize(), 
        success:function(response)
        {
            notificacionSuccess(response.mensaje);
            listado_asesor_actividades();
            cerrar_modal_edicion();
           /* console.log(response); */              

        },
        error:function(error)
        {
           notificacionError(error.responseJSON.mensaje);
           mostrarErroresEdicion(error);
           activarBoton();

        }
    });     
}

function completar_precio(pk){ 
    activarBoton();
    
    console.log('dentro de precio')
    console.log(id_filtro_global)

    /*let precio=document.getElementById("actPrecioAsesor").value;*/
    let precio=jQuery('input[id="actPrecioAsesor"]').val();
   /* datos={
        precio:precio
    }
   console.log(datos);*/
    $.ajax({
        data:{
            csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),     
            precio:precio      
        },   
        url:'/asesor_fbv/actividad_precio/'+pk+'/',
        type: 'post',
        success:function(response)
        {
            notificacionSuccess(response.mensaje);
            //ajax_cargar_actividades();
            obtener_items_por_pagina()
            cerrar_modal_precio();         
           /* console.log(response); */

        },
        error:function(error)
        {
           notificacionError(error.responseJSON.mensaje);

        }
    });     
}
function subir_actividad_resuelta(pk){
    let nueva_fecha_entrega=jQuery('input[id="actnewFechaEntrega"]').val();
    if((document.getElementById('archivo_actividad_resuelta').value!= "" || document.getElementById("ar").value!="" || document.getElementById("link_actividad_resuelta").value!="") && nueva_fecha_entrega!="")
    {

        activarBoton();
        /*let precio=document.getElementById("actPrecioAsesor").value;*/
        var data = new FormData();

        let dia =new Date(nueva_fecha_entrega).getDay()
        let hora=new Date(nueva_fecha_entrega).getHours()
        let minutos=new Date(nueva_fecha_entrega).getMinutes()
        let hora_entrega=jQuery('input[name="hora"]').val();
        //
        let archivo=$("input[id^='archivo_actividad_resuelta']")[0].files[0];
        let link_respuesta=document.getElementById("link_actividad_resuelta").value;
        extension=document.getElementById('archivo_actividad_resuelta').value.split('.').pop();
        data.append('dia',dia);
        data.append('hora',hora);
        data.append('minutos',minutos);
        data.append('archivo',archivo);
        data.append('link_respuesta',link_respuesta);
        data.append("extension", extension);
        
        //datos=JSON.stringify(datos)
        console.log(dia);
        console.log(hora);
        console.log(data);

        // Se oculta la etiqueta del archivo
        document.getElementById("archivo_actividad_resuelta").style.display = "block";
        document.getElementById("link_actividad_resuelta").style.display = "none";
        $.ajax({   
            url:'/asesor_fbv/actividad_resuelta/'+pk+'/',
            type: 'post',
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            data: data,  
            success:function(response)
            {
                notificacionSuccess(response.mensaje);
                //ajax_cargar_actividades();
                obtener_items_por_pagina();
                cerrar_modal_respuesta();          
            /* console.log(response); */

            },
            error:function(error)
            {
                notificacionError(error.mensaje);

            }
        });     

    }
    else{           
        Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Campos no ingresados!',
                })

    }
    
}

function llenar_form(){

    $("#actCodigoAlumno").val(Aux[filaI].codigo_alumno);
    $("#actFechaSolicitud").val(Aux[filaI].fecha_solicitud);
    $("#actCurso").val(Aux[filaI].curso);
    $("#actFechaEntrega").val(Aux[filaI].fecha_entrega);
    $("#actActividad").val(Aux[filaI].link_actividad);
    $("#actPrecioAsesor").val(Aux[filaI].precio);
    $("#actEstadoTarea").val(Aux[filaI].estado_tarea);
    $("#actRespuesta").val(Aux[filaI].actividad_resuelta);

}
function eliminar(pk){
    $.ajax({
        data:{
            csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val()
        },    
        url:'/asesor_fbv/actividad_delete/'+pk+'/',
        type: 'post',
        success:function(response)
        {
            notificacionSuccess(response.mensaje);
            listado_asesor_actividades();
            cerrar_modal_eliminacion();
           /* console.log(response); */
                  

        },
        error:function(error)
        {
           notificacionError(error.responseJSON.mensaje);

        }
    });     
}
function mostrarErroresCreacion(errores)
{
    $('#errores').html("");
    let error="";
    for(let item in errores.responseJSON.error)
    {
        error+='<div class="alert alert-danger" <strong>' +errores.responseJSON.error[item] + '</strong></div>'
    }
    $('#errores').append(error);
}
function mostrarErroresEdicion(errores)
{
    $('#erroresEdicion').html("");
    let error="";
    for(let item in errores.responseJSON.error)
    {
        error+='<div class="alert alert-danger" <strong>' +errores.responseJSON.error[item] + '</strong></div>'
    }
    $('#erroresEdicion').append(error);
}
function mostrarErroresPrecio(errores)
{
    $('#erroresPrecio').html("");
    let error="";
    for(let item in errores.responseJSON.error)
    {
        error+='<div class="alert alert-danger" <strong>' +errores.responseJSON.error[item] + '</strong></div>'
    }
    $('#erroresPrecio').append(error);
}
function notificacionError(mensaje)
{
    Swal.fire({
        title:'Error!',
        text:mensaje,
        icon:'error'

    })
}
function notificacionSuccess(mensaje)
{
    Swal.fire({
        title:'Buen Trabajo!',
        text:mensaje,
        icon:'success'
        
    })
}
/*
$(function(){
    
  $("#actFechaSolicitud").datepicker({

    maxDate:"+5Y",
    dateFormat:"yy-mm-dd"
  })  
})*/
$(function(){
    $('#tabla_actividad_asesor tbody').on('click', 'button[name="bton 2"]', function () {
                /*alert('raaa');*/
    });

});
/*
$(function(){
  oninput="funcion_estado_columna()"
 filtro_codigo_alumno_estado.oninput = function() {
   console.log( filtro_codigo_alumno_estado.value);
  };

});*/
$(document).ready(function (){
    ajax_cargar_actividades()
});  
    

