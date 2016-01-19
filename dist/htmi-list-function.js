function page_resize() {
	// iframe 리사이징
	$('#page_size').text($('#page_show').width()+' x '+$('#page_show').height());
};
$(document).ready(function(){
	
	if(mobile) {
		$('#bodyWrap').addClass('mobile');
		$('.iframe_wrap').addClass('portrait');
		$('#btn_mobile').addClass('on');
	} else {
		$('#btn_desktop').addClass('on');
	}

	// first call
	var output="<ul>";
	for (var i in page_list.pages) {
		output+=
		"<li>" +
			"<a href='"+page_list.pages[i].url+"'>"+page_list.pages[i].title+"</a>"+
		"</li>";
	}
	output+="</ul>";

	$("#urls").html(output);
	$("#urls a[href='']").click(function(e){e.preventDefault()});
	$('#btn_reload').children().addClass('fa-spin');

	$('#urls a').each(function(){
		if ( !$(this).attr('href') == '' ){
			$(this).addClass('haslink');
		} else {
			$(this).addClass('nolink');
		}

		$('#urls a.haslink').each(function(){
			var link = $(this).attr('href');
			var link_text = $(this).text();
			$(this).first().addClass('on');

			$(this).click(function(e){
				e.preventDefault();
				$('#urls a').removeClass('on');
				$('#btn_reload').children().addClass('fa-spin');
				$(this).addClass('on');
				$('#page_show').attr('src',link).one('load',function(){ 
					$('#btn_reload').children().removeClass('fa-spin'); 
				});
				
				$('#page_url').val('/'+link);
				$('#page_title, #page_title2').text(link_text);
			});
		});
	});

	var first_value = $('#urls a.haslink').first().attr('href');
	$('#page_title, #page_title2').text($('#urls a.haslink').first().text());
	$('#page_leng').text( '('+$('#urls li a.haslink').length+' pages)' );
	
	$('#page_url').val('/'+ first_value );
	$('#page_url').click(function () { $(this).select(); });
	
	$('#page_show').attr('src',$('#urls a.haslink:first').attr('href')).one('load',function(){ $('#btn_reload').children().removeClass('fa-spin'); });



	// clickable
	$('.rotate').click(function(){
		if( $('.iframe_wrap').hasClass('portrait') ){
			$('.iframe_wrap').addClass('landscape').removeClass('portrait');
		}
		else if( $('.iframe_wrap').hasClass('landscape') ){
			$('.iframe_wrap').addClass('portrait').removeClass('landscape');
		} 
	});
	$('#btn_external').click(function () { 
		window.open('.' + $('#page_url').val());
	});
	$('#btn_reload').click(function () {
		$(this).children().addClass('fa-spin');
		$('#page_show').attr('src','.'+$('#page_url').val()).one('load',function(){ $('#btn_reload').children().removeClass('fa-spin'); });
	});
	$('#btn_mobile').click(function () { 
		$(this).addClass('on');
		$('#btn_desktop').removeClass('on');
		$('body').addClass('mobile');
		$('.iframe_wrap').addClass('portrait');
	});
	$('#btn_desktop').click(function () { 
		$(this).addClass('on');
		$('#btn_mobile').removeClass('on');
		$('body').removeClass('mobile');
		$('.iframe_wrap').removeClass('portrait landscape');
	});
});
$(window).bind('load resize', function(){
	if ( !$('#bodyWrap').hasClass('mobile') ) {
		page_resize(); // 모바일인 경우 비활성화
	}
});