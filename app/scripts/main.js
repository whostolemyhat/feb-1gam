jQuery(document).ready(function($) {
    
    var charOrder = ['Red', 'Gold', 'Purple', 'Blue', 'Green'];
    var sequence = [];
    var userSequence = [];
    var maxLength = $('.character').length;
    var count = 0;
    var correct = true;

    for(var i = 0; i < maxLength; i++) {
        sequence.push(Math.floor(Math.random() * maxLength) + 1);
    }

    for(var i = 0; i < sequence.length; i++) {
        // play sequence
        // $('.character').eq(sequence[i]).animate({ fontSize : '30px '}).css({ color: 'red'});
        $('.sequence').append(charOrder[sequence[i] - 1]);
        // animate sequence starting at 0 (first element)
        playSequence(0);

        // $('.character:eq(' + sequence[i] + ')').animate({ 
        //     width: '170',
        //     height: '220',
        //     marginLeft: 0,
        //     marginTop: 0
        // }, 150, function() {
        //     $(this).animate({
        //         width: '150',
        //         height: '200',
        //         marginLeft: '10px',
        //         marginTop: '10px'
        //     }, 150);
        // })
    }

    $('.character').click(function(e) {
        e.preventDefault();
        var $this = $(this);

        // TODO: hardcoded animation
        $(this).animate({ 
            width: '170',
            height: '220',
            marginLeft: 0,
            marginTop: 0
        }, 150, function() {
            $(this).animate({
                width: '150',
                height: '200',
                marginLeft: '10px',
                marginTop: '10px'
            }, 150);
        });

        userSequence.push($this.index());
        $('.user').text(userSequence);

        // $this.data('original-size', $this.css('fontSize'));

        // $this.animate({
        //     fontSize: "40px"
        // }, 250);
        // setTimeout(function() { normalSize($this) }, 1000);
        count++;

        if(count === maxLength) {
            $('#main').append('<span class="message">Checking...</span>');
            correct = checkSequence(sequence, userSequence);

            if(correct) {
                $('.message').text('Correct');
            } else {
                $('.message').text('Wrong!');
            }
        }

        
    });

    function normalSize(el) {
        el.animate({ fontSize : el.data('original-size') }, 250);
    }

    function checkSequence(a1, a2) {
        // Checks if each item in two arrays are equal
        // Order is important!
        if(a1.length !== a2.length) {
            return false;
        }

        for(var i = 0; i < a1.length; i++) {
            if(a1[i] !== a2[i]) {
                return false;
            }
        }

        return true;
    }

    function playSequence(i) {
        var el = $('.character:eq(' + sequence[i] + ')');
        console.log(sequence);
        console.log(el);

        el.animate({ 
            width: '170',
            height: '220',
            marginLeft: 0,
            marginTop: 0
        }, 150, function() {
            $(this).animate({
                width: '150',
                height: '200',
                marginLeft: '10px',
                marginTop: '10px'
            }, 150);
        });

        i++;
        if(i < sequence.length) {
            setTimeout(function() { playSequence(i); }, 1000);
        }
    }

});
