//  initialize the WOW.js
new WOW().init();

// navbar
$(function() {

  var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {

			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();

    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	};
	siteMenuClone();

});

// Modal Video
$(document).ready(function () {
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
        console.log("Video URL set to: " + $videoSrc); // Debugging line
    });

    $('#videoModal').on('shown.bs.modal', function (e) {
        console.log("Modal shown. Setting video src to: " + $videoSrc); // Debugging line
        $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });

    $('#videoModal').on('hide.bs.modal', function (e) {
        console.log("Modal hidden. Clearing video src."); // Debugging line
        $("#video").attr('src', '');
    });
});

// Counter
$(document).ready(function() {
    var counters = $(".count");
    var countersQuantity = counters.length;
    var counter = [];

    for (var i = 0; i < countersQuantity; i++) {
        counter[i] = parseInt(counters[i].innerHTML, 10);
    }

    var count = function(start, value, id) {
        var localStart = start;
        var increment = Math.ceil(value / 100); // Adjust increment to speed up counting
        var interval = setInterval(function() {
            if (localStart < value) {
                localStart += increment;
                if (localStart > value) {
                    localStart = value;
                }
                counters[id].innerHTML = localStart;
            } else {
                clearInterval(interval);
            }
        }, 20); // Decrease interval duration for faster updates
    }

    var startCounting = function() {
        for (var j = 0; j < countersQuantity; j++) {
            count(0, counter[j], j);
        }
    }

    // Intersection Observer to trigger the counting
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    counters.each(function() {
        observer.observe(this);
    });
});

// Reels Video
document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".video");

    videos.forEach(video => {
        const card = video.closest(".card");
        const playPauseButton = card.querySelector(".play-pause-button");

        playPauseButton.addEventListener("click", function () {
            if (video.paused) {
                video.play();
                video.muted = false; // Unmute the video
                playPauseButton.querySelector(".bi-play-fill").classList.add("d-none");
                playPauseButton.querySelector(".bi-pause-fill").classList.remove("d-none");
            } else {
                video.pause();
                playPauseButton.querySelector(".bi-play-fill").classList.remove("d-none");
                playPauseButton.querySelector(".bi-pause-fill").classList.add("d-none");
            }
        });
    });
});

//Date and Time
document.addEventListener('DOMContentLoaded', function() {
  flatpickr("#date", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  });

  flatpickr("#time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
  });
});

//Appointment Form Validation
$(document).ready(function () {
    // Generate captcha on page load
    generateCaptcha();

    // Handle captcha refresh button click
    $("#refresh-captcha").click(function () {
        generateCaptcha();
        $("#captcha-input").val("");
    });

    // Handle form submit
    $("#appointment-form").submit(function (event) {
        event.preventDefault();

        // Validate captcha
        var captchaInput = $("#captcha-input").val();
        var captchaCode = sessionStorage.getItem("captchaCode");
        if (captchaInput != captchaCode) {
            New.alert({
                status: 'error',
                title: 'Invalid Captcha',
                content: 'Invalid captcha code. Please try again.'
            });
            generateCaptcha();
            $("#captcha-input").val("");
            return;
        }

        // Form validation successful, submit form
        New.alert({
            status: 'success',
            title: 'Successfully Submitted!',
            content: 'We will get back to you shortly.'
        });
        $("#appointment-form").trigger("reset");
        generateCaptcha();
    });

    // Define the function generateCaptcha()
    function generateCaptcha() {
        var a = $("#captcha")[0],
            b = a.getContext("2d");
        b.clearRect(0, 0, a.width, a.height);
        var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            e = "",
            g = -45,
            h = 45,
            i = h - g,
            j = 20,
            k = 30,
            l = k - j;
        for (var m = 0; m < 6; m++) {
            var n = f.charAt(Math.floor(Math.random() * f.length));
            e += n;

            b.font = j + Math.random() * l + "px Arial";
            b.textAlign = "center";
            b.textBaseline = "middle";
            b.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";

            var o = g + Math.random() * i;
            b.translate(20 + m * 30, a.height / 2);
            b.rotate(o * Math.PI / 180);
            b.fillText(n, 0, 0);
            b.rotate(-1 * o * Math.PI / 180);
            b.translate(-(20 + m * 30), -1 * a.height / 2);
        }
        sessionStorage.setItem("captchaCode", e);
    }

    // Custom alert function
    const New = {
        status: 'success',
        title: '',
        content: '',
        alert: function ({ status, title, content, confirmbtn = true }) {
            var modal = document.createElement('section');
            modal.setAttribute('class', 'alert_modal');
            document.body.append(modal);
            var alert = document.createElement('div');
            alert.setAttribute('class', 'alert_container');
            modal.appendChild(alert);

            alert.innerHTML = `
                <div class="alert_heading"></div>
                <div class="alert_details">
                    <h2>${title}</h2>
                    <p>${content}</p>
                </div>
                <div class="alert_footer"></div>
            `;

            var alert_heading = alert.querySelector('.alert_heading');
            var alert_footer = alert.querySelector('.alert_footer');

            if (status == 'success') {
                alert_heading.innerHTML = `
                    <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path></g></svg>
                `;
                alert_footer.innerHTML = `<span class="close" title="Ok">Ok</span>`;
                alert_heading.style = 'background: linear-gradient(80deg, #67FF86, #1FB397);';
                alert.querySelector('.alert_details > h2').style.color = '#1FB397';
            } else if (status == 'error') {
                alert_heading.innerHTML = `
                    <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
                `;
                alert_footer.innerHTML = `<span class="close" title="Ok">Ok</span>`;
                alert_heading.style = 'background: linear-gradient(80deg, #FF6767, #B31F1F);';
                alert.querySelector('.alert_details > h2').style.color = '#B31F1F';
            }

            alert_footer.querySelector('.close').addEventListener('click', function () {
                alert.remove();
                modal.remove();
            });
        }
    };
});

//Contact Form Validation
$(document).ready(function () {

    // Handle form submit
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        // Validate captcha
        var captchaInput = $("#captcha-input").val();
        var captchaCode = sessionStorage.getItem("captchaCode");
        if (captchaInput != captchaCode) {
            New.alert({
                status: 'error',
                title: 'Invalid Captcha',
                content: 'Invalid captcha code. Please try again.'
            });
            generateCaptcha();
            $("#captcha-input").val("");
            return;
        }

        // Form validation successful, submit form
        New.alert({
            status: 'success',
            title: 'Successfully Sent!',
            content: 'We will get back to you shortly.'
        });
        $("#appointment-form").trigger("reset");
        generateCaptcha();
    });


    // Custom alert function
    const New = {
        status: 'success',
        title: '',
        content: '',
        alert: function ({ status, title, content, confirmbtn = true }) {
            var modal = document.createElement('section');
            modal.setAttribute('class', 'alert_modal');
            document.body.append(modal);
            var alert = document.createElement('div');
            alert.setAttribute('class', 'alert_container');
            modal.appendChild(alert);

            alert.innerHTML = `
                <div class="alert_heading"></div>
                <div class="alert_details">
                    <h2>${title}</h2>
                    <p>${content}</p>
                </div>
                <div class="alert_footer"></div>
            `;

            var alert_heading = alert.querySelector('.alert_heading');
            var alert_footer = alert.querySelector('.alert_footer');

            if (status == 'success') {
                alert_heading.innerHTML = `
                    <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"/></path></g></svg>
                `;
                alert_footer.innerHTML = `<span class="close" title="Ok"><a href="index.html">Ok</a></span>`;
                alert_heading.style = 'background: linear-gradient(80deg, #67FF86, #1FB397);';
                alert.querySelector('.alert_details > h2').style.color = '#1FB397';
            } else if (status == 'error') {
                alert_heading.innerHTML = `
                    <svg width="80" height="80" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="8" stroke-dashoffset="8" d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"/></path></g></svg>
                `;
                alert_footer.innerHTML = `<span class="close" title="Ok">Ok</span>`;
                alert_heading.style = 'background: linear-gradient(80deg, #FF6767, #B31F1F);';
                alert.querySelector('.alert_details > h2').style.color = '#B31F1F';
            }

            alert_footer.querySelector('.close').addEventListener('click', function () {
                alert.remove();
                modal.remove();
            });
        }
    };
});

//Popup Window
$(document).ready(function() {
  // Show the modal when the page loads
  $('#myModal').modal({
    backdrop: 'static', // Disable closing by clicking outside the modal
    keyboard: false     // Disable closing by pressing the escape key
  });

  // Open the modal on page load
  $('#myModal').modal('show');

  // Handle the OK button click
  $('#okButton').click(function() {
    // Redirect to appointment.html
    window.location.href = 'appointment.html';
  });
  $('#noButton').click(function() {
    // Redirect to appointment.html
    window.location.href = 'homepage.html';
  });
});

//Faq
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    const body = faq.querySelector(".faq-body");
    body.classList.toggle("active");
  });
});
