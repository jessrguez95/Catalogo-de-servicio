$(document).ready(function(){
    var servicios = [];
    var categorias = [];
    var elementoLista;
    var servicio;
    var imagen = "../../images/play.png";


   
        //Verificar si exite memoria
        
        //Limpiar la base de datos
        //localStorage.removeItem('servicios');
       
        if(localStorage.getItem('servicios')!= undefined && localStorage.getItem('categorias')!=undefined){
            servicios = JSON.parse(localStorage.servicios);
            categorias = JSON.parse(localStorage.categorias);
            impirimirServicios();
        }
        else{

            $("#cont_Inicio").replaceWith(
                "<h2>No hay Servicios Agregados </h2>"
            );
        }

        //Seleccionar la Imagen
        $('.imagen_Servicio').click(function(event){
            imagen = ($(this).attr('src'));
            console.log(imagen)
        });

        // Guardar Nuevo Servicio
        $('#btn_AgregarServicio').click(function(event){
            event.preventDefault();
            crearServicio();
            limpiarInputsCrear();
            window.location.href = "#inicio";
            impirimirServicios();
            location.reload();
        });

        // Abrir servicio
         $(".verServicio").live("click", function() {
              var id = "";
              var urlId = link = $(this).attr('href');
              var id = urlId.substr(urlId.indexOf("="), urlId.length-1);
                  id=id.replace("=",'');
            abrirServicio(id);
        });

        // Abrir edición de un servicio
        $(".editarServicio").live("click", function() {
              var id = "";
              var urlId = link = $(this).attr('href');
              var id = urlId.substr(urlId.indexOf("="), urlId.length-1);
                  id=id.replace("=",'');
            abrirEdicionServicio(id);
        });
        
        // Editar Servicio
        $('#btn_EditarServicio').live("click", function() {
            editarServicio(imagen);
            impirimirServicios();
            updateLocalStorage();
            window.location.href ="#inicio"
            location.reload();
           
        });

        //Eliminar Servicio
         $('#btn_EliminarServicio').click(function() {
            eliminarServicio();
            updateLocalStorage();
            window.location.href="#inicio";
            location.reload();
            
        });



    // Funciones


    function updateLocalStorage(){
        localStorage.setItem('servicios',JSON.stringify(servicios));
        localStorage.setItem('categorias',JSON.stringify(categorias));
       
    }


     function crearServicio(){
         if(imagen === null || imagen === ""){
             imagen = "images/hospital.png";
         }
         servicio = new Object();
             servicio.id = $('#txt_ID').val();
             servicio.nombre = $('#txt_Nombre').val();
             servicio.imagen = imagen;
             servicio.descripcion = $('#txt_Descripcion').val();
             servicio.correo = $('#txt_Mail').val();
             servicio.domicilio = $('#txt_Domicilio').val();
             servicio.categoria = $('#txt_Categoria').val();
             servicio.nota = $('#txt_Nota').val();

            //  Añadir servicio y categoría a la base de datos
             servicios.push(servicio);
             categorias.push(servicio.categoria);
            
            // Eliminar categoría repetida
            categorias = categorias.filter(function(value, index, array){
                return array.indexOf(value) == index;
            });
            
            impirimirServicios();
            updateLocalStorage();

            
    }


    function impirimirServicios(){
        if(servicios.length <=0 || servicios === null){
             $("#cont_Inicio").replaceWith(
                "<h2>No hay Servicios Agregados </h2>"
            );
            categorias.splice(0);
            return;
        }
        var contenido = '';
         
        var lista=$("#mainColl");
        lista.empty();
        for(var i = 0; i<categorias.length; i++){
            var collapsible= $('<div data-role="collapsible">');
            collapsible.append('<h2>'+ categorias[i]+ '</h2>');
                
            var list = $('<ul data-role="listview" data-divider-theme="c" data-filter="true" data-filter-placeholder="Buscar Servicios..."   data-split-theme="c" data-inset="true" >');
            list.append('<li data-role="list-divider">Servicios</li>');
                    
            for(var j =0;j <servicios.length; j++){
                if(servicios[j].categoria === categorias[i] ){
                     list.append('<li >'+
                                        '<a href=\"#infoServicio?id='+servicios[j].id+'\" class="verServicio">' + servicios[j].nombre +
                                        '<a href="#EditarServicio?id='+servicios[j].id+'" class="editarServicio">Editar</a> </a>'+
                                        
                                '</li>');
                }
               
                
            }
            collapsible.append(list);
            lista.append(collapsible);
            lista.trigger('create');
        }
    }

   function abrirServicio(id){
    //    console.log(id);
    var contenedor = $('#contenedor_Servicio');
    var servicioBuscado = servicios.filter(function (value) {
                                            return value.id == id
                                        });
    contenedor.empty();
    console.log(servicioBuscado[0].imagen);
    
    contenedor.append('<center><div class="imageContainer">'+
                      '<img src="'+servicioBuscado[0].imagen+'" alt="Icono servicio" class="imagen_Servicio">'+
                      '</div>'+
                      '<p><b> ID : </b>'+ servicioBuscado[0].id + '</p>'+
                      '<p><b> Nombre : </b> '+ servicioBuscado[0].nombre + '</p>'+
                      '<p><b> Correo : </b> '+ servicioBuscado[0].correo + '</p>'+
                      '<p><b> Domicilio : </b> '+ servicioBuscado[0].domicilio + '</p>'+
                      '<p><b> Categoría : </b> '+ servicioBuscado[0].categoria + '</p>'+
                      '<p><b> Descripción : </b> '+ servicioBuscado[0].descripcion + '</p>'+
                      '<p><b> Nota : </b> '+ servicioBuscado[0].nota + '</p>'
    );
   }


   function abrirEdicionServicio(id){
       var contenedor = $("#cont_EditarServicio");
        
       // Buscar servicio en base al id
       var servicioBuscado = servicios.filter(function (value) {
                                            return value.id == id
                                        });
      $('#txt_EditarID').val(servicioBuscado[0].id);
      $('#txt_EditarNombre').val(servicioBuscado[0].nombre);
      
      imagen = servicioBuscado[0].imagen;
    
      $('#txt_EditarMail').val(servicioBuscado[0].correo);
      $('#txt_EditarDescripcion').val(servicioBuscado[0].descripcion);
      $('#txt_EditarDomicilio').val(servicioBuscado[0].domicilio);
      $('#txt_EditarCategoria').val(servicioBuscado[0].categoria);
      $('#txt_EditarNota').val(servicioBuscado[0].nota);

    
      
       
    
   }

   function editarServicio(imagen){
        
    var id = $('#txt_EditarID').val();
    
    for(i = 0; i<servicios.length; i++ ){
        if(servicios[i].id===id){
        
             servicios[i].nombre = $('#txt_EditarNombre').val();
             servicios[i].imagen = imagen
             servicios[i].descripcion = $('#txt_EditarDescripcion').val();
             servicios[i].correo = $('#txt_EditarMail').val();
             servicios[i].domicilio = $('#txt_EditarDomicilio').val();
             servicios[i].categoria = $('#txt_EditarCategoria').val();
             servicios[i].nota = $('#txt_EditarNota').val();             
             return;
        }
    }

     
            impirimirServicios();
            updateLocalStorage();
            window.location.href="#inicio";

           
   }


   function eliminarServicio(){

       if(servicios.length === 1){
           servicios.splice(0);
           categorias.splice(0);
           localStorage.clear();
       }else{
            var id = $('#txt_EditarID').val();
            for(i = 0; i<servicios.length; i++ ){
                if(servicios[i].id===id){
                    servicios.splice(i,i);
                    console.log(servicios.splice(i,i));
                }
            }
           
       }

            impirimirServicios();
            updateLocalStorage();
            
      
       
   }


   function limpiarInputsCrear(){
       $('#txt_EditarID').val('');
      $('#txt_EditarNombre').val('');
      imagen = '';
      $('#txt_EditarMail').val('');
      $('#txt_EditarDescripcion').val('');
      $('#txt_EditarDomicilio').val('');
      $('#txt_EditarCategoria').val('');
      $('#txt_EditarNota').val('');
   }
});



