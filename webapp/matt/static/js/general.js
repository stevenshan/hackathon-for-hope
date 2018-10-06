String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

$(function(){
    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.number-input input');
    $('.number-input').each(function() {
        var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max)
            {
                var newVal = oldValue;
            } 
            else 
            {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min)
            {
                var newVal = oldValue;
            }
            else
            {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });
});

function initializeSelectInput(elem, func)
{
    var visible = false;
    var title = elem.find(".select-input-title");
    var titleLabel = title.find("span");
    var menu = elem.find(".select-input-menu");
    var inputs = elem.find(".select-input-menu input");

    var toggleMenu = (e) => {
        visible = !visible;
        elem.toggleClass("active", visible);
        if (e !== undefined)
        {
            e.stopPropagation();
        }
    };

    title.click(toggleMenu);

    inputs.change(function(){
        var label = $(this).next().html();
        titleLabel.html(label);
        visible = true;
        toggleMenu();
        if (func !== undefined)
        {
            func(label);
        }
    });

    $(window).click(function(){
        elem.removeClass("active");
        visible = false;
    });
}
