// JavaScript event handlers for dict.html
$(function() {

    $('#search').keyup(event => { if (event.keyCode == 13) { search(); } });
    $('#btn').click(search());
    $('#showAll').click(() =>
        search()('all')
    );

    function search() {
        return (flag) => {
            let word = $('#search').val();
            if (typeof word !== 'string') {
                $('#results').fadeOut();
                $('#errors').text('Input should be type of string.');
                $('#errors').fadeIn();
                return;
            }
            
            if (word.length < 1) {
                $('#results').fadeOut();
                $('#errors').text('Input should at least have a length of 1.');
                $('#errors').fadeIn();
                return;
            }

            let url = "/api/words/" + word + "/10";
            if (flag === "all") url = "/api/words/" + word;

            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(result) {

                    $('#results').fadeIn();
                    $('#searchWord').text($('#search').val());
                    $('#nResults').text(result.length);

                    if (flag === "all") $('#showAll').hide();

                    if (result.length === 0) {
                        $('#errors').text('No Results found.');
                        $('#errors').fadeIn();
                    }

                    $('table tbody tr').slideUp().remove();

                    if (result.length > 0) {
                        $('table').removeClass('hide');
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].word)
                                $('<tr><td>' + (i + 1) + '</td><td>' + result[i].word + '</td><td>' + ((result[i].type) ? result[i].type : ' " " ') + '</td><td>' + result[i].definition + '</td></tr>').appendTo($('table tbody')).slideDown("slow");
                        }
                    } else {
                        $('table').addClass('hide');
                    }
                },
                error: function(result) {
                    $('#errors').text('An ajax error occurred.');
                }
            }).done(function() {
                setTimeout(function() {
                    $("#overlay").fadeOut(300);
                }, 500);
            });
        };

    }

    $(document).ajaxSend(function() {
        $("#overlay").fadeIn(300);　
    });

});