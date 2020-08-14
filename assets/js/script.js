$(document).ready(function () {

    // Al poner el cursor sobre la pokebola esta parpadea
    $('#pokeball').hover(function () {
        $(this).fadeOut(100);
        $(this).fadeIn(500);
        $(this).fadeOut(100);
        $(this).fadeIn(500);
    })

    // Llena la lista select con el nombre de todos los pokemones
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=1000/',
        dataType: "json",
        async: true,
        success: function (data) {
            var pokemones = $('#favPokemon').empty();
            $(pokemones).append('<option></option>');
            for (var i = 0; i < data.count; i++) {
                $(pokemones).append('<option value=' + data.results[i].name + '>' + data.results[i].name + '</option>');
            }
        }
    });

    // Despliega imagen de pokemon favorito
    $('#favPokemon').on('change', function () {
        var selectedPokemon = $("option:selected").text();
        $.ajax({
            type: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + selectedPokemon,
            dataType: "json",
            async: true,
            success: function (data) {
                $('.image').empty().append('<img class="image" id="image" src='
                    + data.sprites.front_default + ' alt=' + selectedPokemon + '><button type="button" class="switch-chart">Estadísticas ' + selectedPokemon + '</button>');
            }
        })
    });

    // Al clickear el boton se muestra el graph de stats de pokemon favorito
    $(document).on('click', '.switch-chart', function () {
        var selectedPokemon = $("option:selected").text();
        $.ajax({
            type: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + selectedPokemon,
            dataType: "json",
            async: true,
            success: function (data) {
                var min = Math.min(data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[5].base_stat);
                var options = {
                    animationEnabled: true,
                    title: {
                        text: selectedPokemon, 
                        fontFamily: "Bangers"             
                    },
                    axisY: {
                        minimum: min/2
                    },
                    toolTip: {
                        enabled: false},
                    height:300,
                    data: [              
                    {
                        type: "column",
                        indexLabel: "{y}",
                        dataPoints: [
                            { label: "HP",  y: data.stats[0].base_stat},
                            { label: "Ataque", y: data.stats[1].base_stat},
                            { label: "Defensa", y: data.stats[2].base_stat},
                            { label: "Velocidad",  y: data.stats[5].base_stat}  
                        ]
                    }
                    ]
                };
                
                // Rellena clase image con grafico y boton
                $('.image').empty().CanvasJSChart(options);
                $('.image').append('<button type="button" class="switch-img">Imagen ' + selectedPokemon + '</button>');
            }
        })
    });

    // Al clickear el boton se muestra imagen de pokemon favorito
    $(document).on ('click', '.switch-img', function () {
        var selectedPokemon = $("option:selected").text();
        $.ajax({
            type: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/' + selectedPokemon,
            dataType: "json",
            async: true,
            success: function (data) {
                $('.image').empty().append('<img class="image" id="image" src='
                    + data.sprites.front_default + ' alt=' + selectedPokemon + '><button type="button" class="switch-chart">Estadísticas ' + selectedPokemon + '</button>');
            }
        })
    });
});

