define(["jquery","actions","request","view"],function(){var a=require("actions"),b=require("request");require("view");$("#btn-open-accessibility").click(a.openAccessibility),$("#btn-close-accessibility").click(a.closeAccessibility),a.openLoadingMain(),b.getParties(function(a){var b=require("view");b.buildComboParties(".select-party",a,function(){var a=require("actions");a.closeLoadingMain()})}),$("#link-all-congressmen").click(a.openAllCongressmen)});