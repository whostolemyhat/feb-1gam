jQuery(document).ready(function($) {
    
    var charOrder = ['Red', 'Gold', 'Purple', 'Blue', 'Green'];
    var sequence = [];
    var userSequence = [];
    var userReadable = [];
    var maxLength = $('.character').length;
    var count = 0;
    var correct = true;
    var order = [];
    score = 0;

    

    $('#play').click(function(e) {
        e.preventDefault();
        $('.hero-unit').slideDown();
        init();
    });

    $('.character').click(function(e) {

        e.preventDefault();
        var $this = $(this);

        console.log($this.index()); 

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
        userReadable.push(charOrder[$this.index()]);
        $('.user').text(userReadable);

        // $this.data('original-size', $this.css('fontSize'));

        // $this.animate({
        //     fontSize: "40px"
        // }, 250);
        // setTimeout(function() { normalSize($this) }, 1000);
        count++;

        if(count === maxLength) {
            // console.log(sequence, userSequence);

            $('#main').append('<span class="message">Checking...</span>');
            correct = checkSequence(sequence, userSequence);

            if(correct) {
                $('.message').text('Correct');
                score += 100;

                // next round
                setTimeout(init, 300);

            } else {
                $('.message').text('Wrong! Game Over');
                $('.sequence').hide().append(order).fadeIn('slow');
            }
            $('#score').text(score);
        }

    });

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
        // animate each element in sequence
        var el = $('.character:eq(' + parseInt(sequence[i]) + ')');
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

    function init() {
        sequence = [];
        userSequence = [];
        userReadable = [];
        order = [];
        count = 0;
        correct = true;

        $('.message').text('Next round');
        $('.sequence').hide();


        for(var i = 0; i < maxLength; i++) {
            sequence.push(Math.floor(Math.random() * maxLength));
        }

        for(var i = 0; i < sequence.length; i++) {
            // readable version of sequence - used at end of game if wrong
            order.push(charOrder[sequence[i]]);
            // animate sequence starting at 0 (first element)
            setTimeout(function() { playSequence(0); }, 500);
        }
    }

});
