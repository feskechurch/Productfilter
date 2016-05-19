$(document).ready(function () {
    var selectedOption = [];
    var stock = false;
    var discount = false;
    var priceFilter = false;
    $(".filtermenu").hide();
    $("#filter").click(function () {
        var isVisible = $(".filtermenu").is(":visible");
        if (isVisible) {
            $(".filtermenu").hide();
        } else {
            $(".filtermenu").show();
            getPriceRange;
        }
    });



//get high and low price

    var priceMax = 0;
    var priceMin = 0;

//window.onload(getPriceRange);

    var getPriceRange = function () {
        var priceElements = $(".price").toArray();
        var priceList = [];
        for (var i = 0; i < priceElements.length; i++) {

            var item = priceElements[i].innerText;
            var number = item.split(",");

            var p = [];
            var x = number[0].split(".")[0];
            var y = number[0].split(".")[1];
            p.push(x);
            p.push(y);

            var res = p.join('');
            priceList.push(parseInt(res));

        }
        priceMax = Math.max.apply(Math, priceList);
        priceMin = Math.min.apply(Math, priceList);
        $("#high").attr({
            "max": priceMax,
            "min": priceMin,
            "value": priceMax
        });
        $("#low").attr({
            "min": priceMin,
            "max": priceMax,
            "value": priceMin
        });

    }()




    $(".option").click(function () {
        var val = "";
        var results = "";
        if ($(this).hasClass('atrcolor')){
        val = $(this).css('background-color');
        hexc(val);
        val = results;
        } else {
            val = $(this).text();
        }
        function hexc(colorval) {
            var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete (parts[0]);
            for (var i = 1; i <= 3; ++i) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length == 1) parts[i] = '0' + parts[i];
            }
            results = '#' + parts.join('');
        }

 

        var color = $(this).css('border-color');
        if ($(this).css('border-color') == 'rgb(0, 0, 0)') {
            $(this).css('border-color', 'rgb(239, 239, 239)');
        } else {
            $(this).css('border-color', 'rgb(0, 0, 0');

        }

        var found = $.inArray(val, selectedOption) > -1;
        if (!found || selectedOption.length > 0) {
            if (found) {
                var item = $.inArray(val, selectedOption);
                if (item > -1) {
                    selectedOption.splice(item, 1);
                }
            } else {
                if (val == "In Stock" || val == "On Sale" || val == "Apply") {
                    if (val == "In Stock") {
                        if (stock) {
                            stock = false;
                        }else{
                            stock = true;
                        }
                    }
                    if (val == "On Sale") {
                        if (discount) {
                            discount = false;
                        } else {
                            discount = true;
                        }
                    }
                    if (val == "Apply") {
                        if (priceFilter) {
                            priceFilter = false;
                        } else {
                            priceFilter = true;
                        }
                    }
                }
                else {
                    selectedOption.push(val);
                }
            }
            $(".product").show();

            var searchQuery = "";
            selectedOption.forEach(function (entry) {
                searchQuery += ":contains('" + entry + "')";
            })
            completequery = ".product:not(" + searchQuery + ")";
            console.log(completequery);
            completequery = ".product:not(" + searchQuery + ")";
            if(selectedOption.length > 0){
                $(completequery).hide();
            }
            //stock filter
            if(stock){
            $(".product:visible").each(function () {
                $(this).find(".stockvalue").each(function () {
                    var instock = parseInt($(this).text());
             
                    if (instock == 0) {
                        $(this).parent().parent().parent().hide();
                    }
                })

            })
            }
            //discount filter
            if (discount) {
                $(".product:visible").each(function(){
                    if (!$(this).hasClass("sale")) {
                        $(this).hide();
                    }
                })

            }
            //pricefilter
            if (priceFilter) {

                var high = (parseInt($("#high").val()) + 1);
               
                var low = (parseInt($("#low").val()) - 1);
                $(".product:visible").each(function () {
                    $(this).find(".price").each(function () {
                        var extractedPrice = $(this).text();

                        var number = extractedPrice.split(",");

                        var p = [];
                        var x = number[0].split(".")[0];
                        var y = number[0].split(".")[1];
                        p.push(x);
                        p.push(y);

                        var res = p.join('');


                        var price = parseInt(res);
                        if (price < low || price > high)
                        {
                            $(this).parent().parent().parent().hide();
                        }
                    })
                })
            }
            if (selectedOption.length == 0 && !stock && !discount && !priceFilter) {
                $(".product").show();
            }

        }

    });


});







