﻿$(document).ready(function () {
    var model = JSON.parse($('.model').text());
    var MeanList = [{ VesselID: '5036', Company: 'Blue Star', VesselName: 'BLUE STAR DELOS' }, { VesselID: '5037', Company: 'Blue Star', VesselName: 'BLUE STAR NAXOS' }];
    var TTimetableAns = [{ Company: 'Blue Star', VesselID: '5036', VesselType: 'C', DepTime: '07:25', ArrTime: '11:40', Available: 'YES', ClassAvail: [{ ClassAdultBasicPrice: 10000 }] }, { Company: 'Blue Star', VesselID: '5037', VesselType: 'H', DepTime: '17:30', ArrTime: '21:45', Available: 'NO', ClassAvail: [{ ClassAdultBasicPrice: 5000 }] }];
    var countcheckboxes = 0;
    var counttables = 1;
    var typeofboat;
    $('.displayroutesinfo').find('table').each(function () {
        for (var i = 0; i < TTimetableAns.length; i++) {
            if (counttables == countcheckboxes) {
                countcheckboxes++;
            }
            if (TTimetableAns[i].VesselType == 'C') {
                typeofboat = 'Conventional';
            }
            else if (TTimetableAns[i].VesselType == 'A') {
                typeofboat = 'Airplane';
            }
            else if (TTimetableAns[i].VesselType == 'D') {
                typeofboat = 'Dolphin/Catamaran';
            }
            else if (TTimetableAns[i].VesselType == 'H') {
                typeofboat = 'HighSpeed';
            }
            if (TTimetableAns[i].Available == 'YES') {
                for (j = 0; j < MeanList.length; j++) {
                    if (MeanList[j].VesselID == TTimetableAns[i].VesselID && MeanList[j].Company == TTimetableAns[i].Company) {
                        var date = new Date(parseInt(model.MultDepList[0].DateFrom.substr(6))).toDateString();
                        var starttime = new Date(date + ' ' + TTimetableAns[i].DepTime).getTime();
                        var endtime = new Date(date + ' ' + TTimetableAns[i].ArrTime).getTime();
                        var difference = (endtime - starttime) / 1000 / 60;
                        $(this).append('<tr>');
                        $(this).find('tr:last').append('<td><input id="selectedroute' + counttables + countcheckboxes + '" type="checkbox" /><label for="selectedroute' + counttables + countcheckboxes + '"><img src="../Content/resultsimages/typeavailable.png"/></label></td><td><div class="routecompany-routename row">' + MeanList[j].Company + ' - ' + MeanList[j].VesselName + '<span style=visibility:hidden>-' + MeanList[j].VesselID + '</span></div><div class="valign-wrapper row"><span class="deproutetime left center-align valign">' + TTimetableAns[i].DepTime + '</span><span class="routeimage center"><span class=leftbordered></span><img src="../Content/resultsimages/shipborder.png" /><span class=rightbordered></span></span><span class="arrroutetime right center-align valign"><span class=row>' + TTimetableAns[i].ArrTime + '</span><span class=timedifference>' + Math.floor((difference / 60)) + ' hr ' + (difference % 60) + ' mins</span></span></div><div class=row><div class="routeprice center-block"><span class=boatprice>' + parseFloat(TTimetableAns[i].ClassAvail[0].ClassAdultBasicPrice) / 100 + '</span> <span class=moneycoin>€</span></div></div></td>');
                        $(this).find('.routecompany-routename').popover({ trigger: 'hover', placement: 'bottom', 'title': 'Vessel Type', 'content': typeofboat });
                        countcheckboxes++;
                    }
                }
            }
            else if (TTimetableAns[i].Available == 'NO') {
                for (j = 0; j < MeanList.length; j++) {
                    if (MeanList[j].VesselID == TTimetableAns[i].VesselID && MeanList[j].Company == TTimetableAns[i].Company) {
                        var date = new Date(parseInt(model.MultDepList[0].DateFrom.substr(6))).toDateString();
                        var starttime = new Date(date + ' ' + TTimetableAns[i].DepTime).getTime();
                        var endtime = new Date(date + ' ' + TTimetableAns[i].ArrTime).getTime();
                        var difference = (endtime - starttime) / 1000 / 60;
                        $(this).append('<tr>');
                        $(this).find('tr:last').append('<td><input id="selectedroute' + counttables + countcheckboxes + '" type="checkbox" disabled="disabled"/><label for="selectedroute' + counttables + countcheckboxes + '"><img src="../Content/resultsimages/typeno.png"/></label></td><td><div class="routecompany-routename row">' + MeanList[j].Company + ' - ' + MeanList[j].VesselName + '<span style=visibility:hidden>-' + MeanList[j].VesselID + '</span></div><div class="valign-wrapper row"><span class="deproutetime left center-align valign">' + TTimetableAns[i].DepTime + '</span><span class="routeimage center"><span class=leftbordered></span><img src="../Content/resultsimages/shipborder.png" /><span class=rightbordered></span></span><span class="arrroutetime right center-align valign"><span class=row>' + TTimetableAns[i].ArrTime + '</span><span class=timedifference>' + Math.floor((difference / 60)) + ' hr ' + (difference % 60) + ' mins</span></div><div class=row><div class="routeprice center-block"><span class=boatprice>' + parseFloat(TTimetableAns[i].ClassAvail[0].ClassAdultBasicPrice) / 100 + '</span> <span class=moneycoin>€</span></div></div></td>');
                        $(this).find('.routecompany-routename').popover({ trigger: 'hover', placement: 'bottom', 'title': 'Vessel Type', 'content': typeofboat });
                        countcheckboxes++;
                    }
                }
            }
        }
        counttables++;
    });
    $('body').on('click', '[id*=selectedroute]', function () {
        var selectedtable = $(this).attr('id');
        selectedtable = selectedtable.split(selectedtable.charAt(selectedtable.length - 1));
        $('[id*=' + selectedtable[0] + ']').prop('checked', false);
        $('[id*=' + selectedtable[0] + ']').find('.leftbordered,.rightbordered').removeClass('active');
        $(this).parent().parent().find('.routeimage > img,.leftbordered,.rightbordered').addClass('active');
        $(this).prop('checked', true);
        var hiddenfield = $(this).parent().parent().parent().parent().parent().find('input[type=hidden]').toArray();
        var routetable = $(this).parent().parent();
        var routecompanyname = routetable.find('.routecompany-routename').text().split('-');
        $(hiddenfield[0]).val(routecompanyname[0]);
        $(hiddenfield[1]).val(routecompanyname[1]);
        $(hiddenfield[2]).val(routecompanyname[2]);
        $(hiddenfield[3]).val(routetable.find('.deproutetime').text());
        $(hiddenfield[4]).val(routetable.find('.arrroutetime > span:first-child').text());
        $(hiddenfield[5]).val(routetable.find('.boatprice').text());
    });


    $(".yourSlider").nerveSlider({
        sliderWidth: "1000px",
        sliderHeight: "100px",
        sliderResizable: true,
        sliderAutoPlay: false,
        slidesDraggable: false,
        showArrows: false,
        showDots: false
    });

   

    $("div").on("click", ".slideclass", function () {

        var resdt = $('#fromdtSliderid').find('.slideclass-reservday');
        moment.lang("el");

        var dtold = moment($(resdt[0]).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
        var dtnew = moment($(this).text().replace("ΐ", "ϊ"), 'DDDD DD MMMM', 'el');
        var now = moment();
        
        if (dtnew.diff(now, 'days') < 0) {
            return;
        }

        var childitems = $(this).parent().parent().find('li');
        var dttemp;
        var diffdays = Math.abs(dtnew.diff(dtold, 'days'));

        if (dtnew.isBefore(dtold)) {
            console.log('prepend');

            for (var j = 0; j < diffdays; j++) {
                $(childitems[$(childitems).length - 2 - j]).show("slide", { direction: "left" }, 500);
                $(childitems[$(childitems).length - 2 - j]).remove();
            }

           
            dttemp = dtold;
            dttemp.subtract(2, 'days');
            for (var j = 1; j <= diffdays ; j++) {
                dttemp.subtract( 1, 'days');
                var divappend = '<li> <div class="slideclass">' +
                    ' <p>' + dttemp.format('dddd') + '</p>' +
                    ' <p>' + dttemp.format('DD MMMM') + '</p> </div></li>';
                $(childitems[0]).after(divappend);
            }

        } else {
            console.log('append');
            
            for (var j = 0; j < diffdays; j++) {
                $(childitems[$(childitems).length - 2 - j]).show("slide", { direction: "right" }, 500);
                $(childitems[1 + j]).remove();
            }

            dttemp = dtold;
            dttemp.add(2, 'days');
            for (var i = 1; i <= diffdays; i++) {
                dttemp.add(1, 'days');
                var divappend = '<li> <div class="slideclass">' +
                    ' <p>' + dttemp.format('dddd') + '</p>' +
                    ' <p>' + dttemp.format('DD MMMM') + '</p> </div></li>';
                $(childitems[$(childitems).length - 1]).before(divappend);
            }
        }


        resdt.removeClass('slideclass-reservday');
        resdt.addClass('slideclass');

        $(this).removeClass('slideclass');
        $(this).addClass('slideclass-reservday');

        //alert(moment(tst, 'DDDD DD MMMM', 'el').isValid());
        
    });

    //$(".ns_nextButton").removeClass();
    //$(".ns_prevButton").removeClass();

    /*var Model = JSON.parse($('.model').val());
    if (Model.Triptype != 2|| Model.MultDepList.length == 1)
    {
        createroute('Αναχώρηση', 0);
        createroute('Επιστροφή', 1);
    }
    else
    {
        for (var i = 0; i < Model.MultDepList.length; i++)
        {
            createroute(i, 2);
        }
    }

    function createroute(message, option) {
        if (option == 0) {
            $('.displayroutes').append('<div class="col-md-11" style="border-bottom:2px solid #1E7FB1;left:20px">' +
                '<img src="../Content/Searchimages/portfrom.png" style="float:left;margin-top:5px;margin-right:5px" />' +
                '<label><span style="font-weight:bolder;color:#1E7FB1;font-size:small">' + message + '</span><br />' + Model.MultDepList[0].DateFrom + ' <span style="font-size:larger">-</span> από <span style="color:orange;font-size:15px">' + Model.MultDepList[0].FromPort.split(",")[0].split("]")[1] + '</span> προς <span style="color:orange;font-size:15px">' + Model.MultDepList[0].ToPort.split(",")[0].split("]")[1] + '</span></label></div>');
        }
        else if (option == 1) {
            $('.displayroutes').append('<div class="col-md-11" style="border-bottom:2px solid #1E7FB1;left:20px">' +
                '<img src="../Content/Searchimages/portto.png" style="float:left;margin-top:5px;margin-right:5px" />' +
                '<label><span style="font-weight:bolder;color:#1E7FB1;font-size:small">' + message + '</span><br />' + Model.MultDepList[0].DateFrom + ' <span style="font-size:larger">-</span> από <span style="color:orange;font-size:15px">' + Model.MultDepList[0].FromPort.split(",")[0].split("]")[1] + '</span> προς <span style="color:orange;font-size:15px">' + Model.MultDepList[0].ToPort.split(",")[0].split("]")[1] + '</span></label></div>');
        }
        else {
            $('.displayroutes').append('<div class="col-md-11" style="border-bottom:2px solid #1E7FB1;left:20px">' +
                    '<img src="../Content/Searchimages/portfrom.png" style="float:left;margin-top:5px;margin-right:5px" />' +
                    '<label><span style="font-weight:bolder;color:#1E7FB1;font-size:small">' + message + 'ο σκέλος</span><br />' + Date(Model.MultDepList[message].DateFrom) + ' <span style="font-size:larger">-</span> από <span style="color:orange;font-size:15px">' + Model.MultDepList[message].FromPort.split(",")[0].split("]")[1] + '</span> προς <span style="color:orange;font-size:15px">' + Model.MultDepList[message].ToPort.split(",")[0].split("]")[1] + '</span></label></div>');
        }
    }*/
});

function movePrevSlide() {
        $(".yourSlider").prevSlide();      // Go to the previous slide.
    }

function moveNextSlide() {
    var resdt = $(".slideclass-reservday");
    var dtold = moment($(resdt[0]).text(), 'DDDD DD MMMM', 'el');

    var appdiv = '<div class="ns_slideContainer ns_lastSlide ns_selected"><img src="../Content/Resultsimages/white.png" alt="">' +
        '<div class="ns_slideContent">' +
        '<ul class="list-inline"><li><a href="javascript:movePrevSlide();"><span class="glyphicon glyphicon-arrow-left"></span></a></li>';
        
        

    dtold.add(2, 'days');
    for (var i = 0; i < 5; i++) {
        dtold.add(1, 'days');
        appdiv += '<li><div class="slideclass"><p>' + dtold.format("dddd", "el").toString() + '</p>' +
            '<p>' + dtold.format("DD MMMM", "el").toString() + '</p></div></li>';
    }

    appdiv += '<li><a href="javascript:moveNextSlide();" id="movenext"><span class="glyphicon glyphicon-arrow-right"></span>' +
        '</a></li></ul></div></div>';
    $(".ns_selected").after(appdiv);
    
    $(".yourSlider").nextSlide(); // Go to the next slide.
}


