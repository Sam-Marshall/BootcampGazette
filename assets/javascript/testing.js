$(document).ready(function() {    
    var html = 
        '<style type="text/css">@import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic,400,700)</style>' +

        '<script type="text/javascript" defer="defer">' +
            'PayScaleExtension.affiliateId = \'\';PayScaleExtension.srcId = \'calcA3\';PayScaleExtension.ServiceURL = \'http://www.payscale.com\';PayScaleExtension.init();' + 
        '</script>' +

        '<style type="text/css">.PayscaleSalaryCalculator table, .PayscaleSalaryCalculator tbody, .PayscaleSalaryCalculator img{margin: 0;padding: 0;border: 0;}' + 
        '</style>' +
        
        '<div class="PayscaleSalaryCalculator" id="PayscaleSalaryCalculator1" style="width: 100%;overflow: hidden; text-align: left;padding: 15px; background-color: #ffffff">' +
            '<div style="width: 100%; min-height: 43px; overflow: auto; height: auto !important; border-bottom: solid 1px #cecece; margin-bottom: 5px;">' +
                '<div style="float: left; background-color: #ffffff; color: #333333; font-family: \'Open Sans\', sans-serif;font-size: 18px; font-weight: bold; line-height: 42px; margin-left: 15px; text-transform: uppercase;">' +
                    '<span id="PayscaleSalaryCalculatorReset1" class="spnLaquo" style="cursor: pointer; color: #888; display: none;" onclick="javascript:PayScaleExtension.resetSalaryCalculatorV3R(\'PayscaleSalaryCalculatorContent1\',\'PayscaleSalaryCalculatorResults1\', \'PayscaleSalaryCalculatorReset1\')">&laquo;</span> Salary Research' + 
                '</div>' +
        
            '<div style="width: 90px; float: right; margin-top: 5px; margin-bottom: 5px;">' +
                '<a rel="nofollow" href="http://www.payscale.com/?af=&src=calcA3" target="_blank">' +
                '<img src="https://cdn-payscale.com/images/powered-by-payscale.png" alt="PayScale" style="border: 0"width="82" height="28" />' + 
                '</a>' + 
            '</div>' + 
        '</div>' +
        
        '<div id="PayscaleSalaryCalculatorContent1" style="margin: 0; width: 100%; min-height: 250px;">' +
            '<form id="PayScale_startModule" name="startModule" action="https://www.payscale.com/syndication/total_pay_chart.aspx" method="get" style="margin:0; padding:5px">' + 
                '<table cellpadding="5" cellspacing="0" border="0" id="startModuleTable" style="color: #333333; font-family: \'Open Sans\', sans-serif; font-size: 15px; line-height: 15px; width: 100%;">' + 
                    
                    '<tr valign="middle">' + 
                        '<td>' + 
                        '<div style="padding-bottom: 5px;"><span>Job Title</span></div>' + 
                        '<input type="text" name="jobTitle" id="PayScale_jobTitle1" value="" placeholder=" e.g. Mechanical Engineer" maxlength="100" style="width: 100%" />' + 
                        '</td>' + 
                    '</tr>' + 
                    
                    '<tr id="startModule_cityRow">' + 
                        '<td>' + 
                        '<div style="padding-bottom: 5px"><span>City</span></div>' + 
                        '<input type="text" name="city" id="PayScale_city1" value="" placeholder=" e.g. Chicago" maxlength="100" style="width: 100%" />' + 
                        '</td>' + 
                    '</tr>' + 
                    
                    '<tr id="stateRow" style="display: ">' + 
                        '<td valign="bottom">' + 
                        '<div style="padding-bottom: 5px">' + 
                            '<span><span id="stateSpan"><span id="startModule_stateLabel">State</span></span></span>' + 
                        '</div>' + 
                        '<div style="margin: 3px 0 3px 0;">' + 
                            '<span id="startModule_stateDropDown_dropDown"><span>' + 
                            '<select class="clsCountryDropDown" id="PayScale_stateDropDown1" name="state" onchange="" style="width: 100%; margin: 0; padding: 0"><option value="">- Select State -</option></span><br /><span><option value="Alabama">Alabama</option></span><br /><span><option value="Alaska">Alaska</option></span><br /><span><option value="Arizona">Arizona</option></span><br /><span><option value="Arkansas">Arkansas</option></span><br /><span><option value="California">California</option></span><br /><span><option value="Colorado">Colorado</option></span><br /><span><option value="Connecticut">Connecticut</option></span><br /><span><option value="Delaware">Delaware</option></span><br /><span><option value="District of Columbia">District of Columbia</option></span><br /><span><option value="Florida">Florida</option></span><br /><span><option value="Georgia">Georgia</option></span><br /><span><option value="Hawaii">Hawaii</option></span><br /><span><option value="Idaho">Idaho</option></span><br /><span><option value="Illinois">Illinois</option></span><br /><span><option value="Indiana">Indiana</option></span><br /><span><option value="Iowa">Iowa</option></span><br /><span><option value="Kansas">Kansas</option></span><br /><span><option value="Kentucky">Kentucky</option></span><br /><span><option value="Louisiana">Louisiana</option></span><br /><span><option value="Maine">Maine</option></span><br /><span><option value="Maryland">Maryland</option></span><br /><span><option value="Massachusetts">Massachusetts</option></span><br /><span><option value="Michigan">Michigan</option></span><br /><span><option value="Minnesota">Minnesota</option></span><br /><span><option value="Mississippi">Mississippi</option></span><br /><span><option value="Missouri">Missouri</option></span><br /><span><option value="Montana">Montana</option></span><br /><span><option value="Nebraska">Nebraska</option></span><br /><span><option value="Nevada">Nevada</option></span><br /><span><option value="New Hampshire">New Hampshire</option></span><br /><span><option value="New Jersey">New Jersey</option></span><br /><span><option value="New Mexico">New Mexico</option></span><br /><span><option value="New York">New York</option></span><br /><span><option value="North Carolina">North Carolina</option></span><br /><span><option value="North Dakota">North Dakota</option></span><br /><span><option value="Ohio">Ohio</option></span><br /><span><option value="Oklahoma">Oklahoma</option></span><br /><span><option value="Oregon">Oregon</option></span><br /><span><option value="Pennsylvania">Pennsylvania</option></span><br /><span><option value="Rhode Island">Rhode Island</option></span><br /><span><option value="South Carolina">South Carolina</option></span><br /><span><option value="South Dakota">South Dakota</option></span><br /><span><option value="Tennessee">Tennessee</option></span><br /><span><option value="Texas">Texas</option></span><br /><span><option value="Utah">Utah</option></span><br /><span><option value="Vermont">Vermont</option></span><br /><span><option value="Virginia">Virginia</option></span><br /><span><option value="Washington">Washington</option></span><br /><span><option value="West Virginia">West Virginia</option></span><br /><span><option value="Wisconsin">Wisconsin</option></span><br /><span><option value="Wyoming">Wyoming</option></span><br /><span></select></span></span></div>' + 
                            '<img src="https://cdn-payscale.com/images/syndication/submit-button-70x27.png" style="cursor: pointer; margin-top: 15px;"onmouseover="this.src=\'http://www.payscale.com/images/syndication/submit-button-70x27-rollover.png\'" onmouseout="this.src=\'http://www.payscale.com/images/syndication/submit-button-70x27.png\'"onclick="javascript:PayScaleExtension.displaySalaryCalculatorV3R(document.getElementById(\'PayScale_jobTitle1\').value,document.getElementById(\'PayScale_city1\').value,document.getElementById(\'PayScale_stateDropDown1\').value,document.getElementById(\'PayScale_country1\').value, \'#333333\', \'#a5d34c\',\'PayscaleSalaryCalculatorContent1\', false, \'PayscaleSalaryCalculatorResults1\', \'PayscaleSalaryCalculatorReset1\');return false;" />' + 
                        '</td>' + 
                    '</tr>' + 
                
                    '<tr>' + 
                        '<td align="right"><input type="hidden" id="PayScale_stateDropDown1" name="state" value="" />' + 
                            '<input type="hidden" id="PayScale_country1" name="country" value="United States" />' + 
                        '</td>' + 
                    '</tr>' + 
                '</table>' + 
            '</form>' + 
        '</div>' + 
        
        '<div id="PayscaleSalaryCalculatorResults1" style="margin: 0; width: 100%; min-height: 250px; display: none;"></div></div>';

    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.toLowerCase().indexOf('assets/javascript/testing.js') > -1) {
            var span = document.createElement('span');
            span.innerHTML = html;
            scripts[i].parentNode.insertBefore(span, scripts[i]);
            break;
        }
    }
});