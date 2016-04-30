﻿$(document).ready(function () {
    var seatclass = [['LUX', '2Bed Lux', 'bedx2.png', 2, 50], ['L1', '2Bed Lux single use', 'bedx1.png', 1, 50], ['A2', '2Bed external', 'bedx2.png', 2, 50], ['A1', '2Bed external single use', 'bedx1.png', 1, 50], ['A3', '3Bed external', 'bedx3.png', 3, 50], ['A4', '4Bed external', 'bedx4.png', 4, 50], ['AA3', '3Bed external (converted from 4Bed)', 'bedx3.png', 3, 50], ['AA2', '2Bed external (converted from 4Bed', 'bedx2.png', 2, 50], ['AB2', '2Bed internal', 'bedx2.png', 2, 50], ['AB1', '2Bed internal single use', 'bedx1.png', 1, 50], ['AB3', '3Bed internal', 'bedx3.png', 3, 50], ['AB4', '4Bed internal', 'bedx4.png', 4, 50], ['B3', '3Bed internal (converted from 4Bed)', 'bedx3.png', 3, 50], ['B2', '2Bed internal (converted from 4Bed)', 'bedx2.png', 2, 50], ['A4K', '4Bed external Pet', 'bedx4.png', 4, 50], ['A3K', '3Bed external Pet (converted from 4Bed)', 'bedx3.png', 3, 50], ['A2K', '2Bed external Pet (converted from 4Bed)', 'bedx2.png', 2, 50], ['A1K', '1Bed external Pet (converted from 4Bed)', 'bedx1.png', 1, 50], ['ATS', 'Aircraft Type Seat', 'availableairseat.png', 5, 50], ['DTS', 'Deck', 'availabledeck.png', 6, 50]];
    for (var i = 0; i < seatclass.length; i++) {
        $('.selectoptions').append('<span class=selectoption value=' + seatclass[i][3] + '><img src="../Content/Passengerimages/seatclass/' + seatclass[i][2] + '"/> ' + seatclass[i][0] + ' : ' + seatclass[i][1] + ' (<span style=color:#1E7FB1;font-weight:bolder>' + seatclass[i][4] + ' </span>€)</span>');
    }
    $('.selected').focus(function () {
        if ($(this).parent().children('.selectoptions').css('display') == 'none') {
            $(this).parent().children('.selectoptions').css('display', 'block');
        }
        else {
            $(this).parent().children('.selectoptions').css('display', 'none');
        }
    });
    $('.selectoption').click(function () {
        $(this).parent().css('display', 'none');
        $(this).parent().parent().find('.selected').val($(this).text());
        $(this).parent().parent().find('.selected').addClass('valid');
        $name = $(this).parent().parent().find('.selected').attr('name').split('.')[0];
        $('[name="' + $name + '.typeseat' + '"]').empty();
        $('[name="' + $name + '.typeseat' + '"]').append('<option value="" disabled selected>Not Set</option>');
        if ($(this).attr('value') == 1) {
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/bedx1.png" class="left" value=1>Whole cabin</option>');
        }
        else if ($(this).attr('value') == 2) {
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/bed.png" class="left" value=1>1 Berth</option>');
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/bedx2.png" class="left" value=' + $(this).attr('value') + '>Whole cabin</option>');
        }
        else if ($(this).attr('value') == 3) {
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/bed.png" class="left" value=1>1 Berth</option>');
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/bedx3.png" class="left" value=' + $(this).attr('value') + '>Whole cabin</option>');
        }
        else if ($(this).attr('value') == 4) {
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/bed.png" class="left" value=1>1 Berth</option>');
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/bedx4.png" class="left" value=' + $(this).attr('value') + '>Whole cabin</option>');
        }
        else if ($(this).attr('value') == 5) {
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/airseat.png" class="left" value=1>1 AirSeat</option>');
        }
        else {
            $('[name="' + $name + '.typeseat' + '"]').append('<option data-icon="../Content/Passengerimages/typeseat/deckseat.png" class="left" value=1>1 DeckSeat</option>');
        }
        $('[name="' + $name + '.typeseat' + '"]').material_select();
        $('.caret').empty();
    });
    $('body').click(function () {
        $(this).find('.selectoptions').css('display', 'none');
    });
    $('select').material_select();
    $('.caret').empty();
});