$(document).ready(function(){
	var arraySlider_FB = $(".Slider_FB");
	for (var i = 0; i < arraySlider_FB.length; i++) {
		//inicializando selector
		var selector = "#"+arraySlider_FB[i].id;
		var content_FB = "#"+arraySlider_FB[i].id+" .content_FB";
		//triplicando contenido
		var html = $(content_FB).html();
		$(content_FB).html(html+html+html);

		// cargando active a :first-child 
		$(content_FB + " .item_FB:first-child ").addClass("active");
		//cargando data base
		var nitems = $(selector).attr("data_nitems");
		if(nitems > 0){
			$(selector+" .item_FB").width(($(selector).width()/nitems));
		}
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
	function next_Slider_FB(id){
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
	}

	function prev_Slider_FB(id){
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
		
	}
	function vActive(id){
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
	}

});