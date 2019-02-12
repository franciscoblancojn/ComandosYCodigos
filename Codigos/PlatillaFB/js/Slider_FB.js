$(document).ready(function(){
	var arraySlider_FB = $(".Slider_FB");
	for (var i = 0; i < arraySlider_FB.length; i++) {
		//inicializando selector
		var selector = "#"+arraySlider_FB[i].id;

		//cargando data base
		var nitems = $(selector).attr("data_nitems");
		if(nitems > 0){
			$(selector+" .item_FB").width(($(selector).width()/nitems));
		}

		//ajustando contenido
		multiHTML(selector);

		// cargando active 
		definitiPos_FB(selector);
	}
	//controles
	var arrayControlSlider_FB = $(".control_Slider_FB");
	for (var i = 0; i < arraySlider_FB.length; i++) {
		//inicializando controles
		var control = "#" + arrayControlSlider_FB[i].id;
		var slider = "#" + $(control).attr("data_id");
		$(control + " .next").click(function(){
			next_Slider_FB(slider);
			vActive(slider);
		});
		$(control + " .prev").click(function(){
			prev_Slider_FB(slider);
		});
	}
	function multiHTML(id){
		var content_FB = $(id+" .content_FB");
		var html = $(content_FB).html();
		$(content_FB).html(html+html+html);
		while(getWidthContent_FB(id) < $(id).width()){
			html = $(content_FB).html();
			$(content_FB).html(html+html);
		}
	}
	function getTransformX_FB(id){
		var traslate = ($(id + " .content_FB").css("transform"));
		var traslate = traslate.split(",");
		var aux2 = traslate[4];
		return Number(aux2);
	}
	function setTransformX_FB(id, transformX){
		$(id + " .content_FB").css("transform","matrix(1, 0, 0, 1,"+transformX+", 0)");
	}
	function getWidthContent_FB(id){
		var aux = $(id + " .item_FB");
		var con=0;
		for (var i = 0; i < aux.length ; i++) {
			con += $(aux[i]).width();
		}
		return con;
	}
	function definitiPos_FB(id){
		var aux = $(id + " .item_FB");
		var con = 0;
		if($(id).attr("data_pos_FB") < aux.length && $(id).attr("data_pos_FB") >= 0){
			con = Number($(id).attr("data_pos_FB"));
		}
		$(id).attr("data_pos_FB",con);
		$(aux).removeClass("active");
		$(aux[con]).addClass("active");
	}
	function getTraslateActive(id){
		var aux = $(id + " .item_FB");
		var con=0;
		for (var i = 0; i < Number($(id).attr("data_pos_FB")); i++) {
			con += $(aux[i]).width();
		}
		return con;
	}
	function next_Slider_FB(id){
		var aux = Number($(id).attr("data_pos_FB"));
		aux++;
		if(aux > $(id + " .item_FB").length -1){
			aux = 0;
		}
		$(id).attr("data_pos_FB",aux);
		definitiPos_FB(id);
		setTransformX_FB(id,-getTraslateActive(id))
		/*
		var aux = $(id + " .item_FB.active").width();
		//matrix(1, 0, 0, 1, val, 0)
		if (aux == null){
			$(id + " .content_FB").css("transform","matrix(1, 0, 0, 1,0, 0)");
			$(id + " .item_FB").removeClass("active");
			$(id + " .item_FB:first-child ").addClass("active");
			return;
		}
		aux *=-1;
		var traslate = ($(id + " .content_FB").css("transform"));
		var traslate = traslate.split(",");
		var aux2 = traslate[4];
		aux +=Number(aux2);
		$(id + " .content_FB").css("transform","matrix(1, 0, 0, 1,"+aux+", 0)");

		$(id + " .item_FB.active + .item_FB").addClass("sw");
		$(id + " .item_FB").removeClass("active");
		$(id + " .item_FB.sw").addClass("active");
		$(id + " .item_FB").removeClass("sw");
		*/
	}

	function prev_Slider_FB(id){
		var aux = Number($(id).attr("data_pos_FB"));
		aux--;
		if(aux < 0){
			aux = $(id + " .item_FB").length -1;
			$(id).attr("data_pos_FB",aux);
			definitiPos_FB(id);
			setTransformX_FB(id,-getWidthContent_FB(id)+$(id).width());
			return;
		}
		$(id).attr("data_pos_FB",aux);
		definitiPos_FB(id);
		setTransformX_FB(id,-getTraslateActive(id))
		/*
		var aux = $(id + " .item_FB");
		var aux2 = null;
		var con=0;
		for (var i = 1; i < aux.length ; i++) {
			if($(aux[i]).hasClass("active")){
				aux2 = $(aux[i-1]);
				//i= aux.length;
			}
			con += $(aux[i]).width();
		}
		con += $(aux[0]).width();
		var aux = $(id + " .item_FB.active");
		if(aux2 == null){
			con *=-1;
			con += $(id).width();
			$(id + " .content_FB").css("transform","matrix(1, 0, 0, 1,"+con+", 0)");
			$(id + " .item_FB").removeClass("active");
			$(id + " .item_FB:last-child ").addClass("active");

			return;
		}
		var maux= $(aux2).width();
		var traslate = ($(id + " .content_FB").css("transform"));
		var traslate = traslate.split(",");
		var naux = traslate[4];
		maux +=Number(naux);
		$(id + " .content_FB").css("transform","matrix(1, 0, 0, 1,"+maux+", 0)");

		$(id + " .item_FB").removeClass("active");
		$(aux2).addClass("active");
		*/
		
	}
	function vActive(id){
		var aux = $(id + " .item_FB");
		var con=0;
		for (var i = Number($(id).attr("data_pos_FB")); i < aux.length; i++) {
			con += $(aux[i]).width();
		}
		if(con < $(id).width()){
			var pos = 0;
			$(id).attr("data_pos_FB",pos );
			definitiPos_FB(id);
			setTransformX_FB(id,-getTraslateActive(id))
		}
		/*
		var aux = $(id + " .item_FB");
		var sw = false;
		var con=0;
		for (var i = 0; i < aux.length ; i++) {
			if($(aux[i]).hasClass("active")){
				sw= true;
			}
			if(sw){
				con += $(aux[i]).width();
			}
		}
		if (con < $(id).width()){
			$(id + " .content_FB").css("transform","matrix(1, 0, 0, 1,0, 0)");
			$(id + " .item_FB").removeClass("active");
			$(id + " .item_FB:first-child ").addClass("active");
		}
		*/
	}

});