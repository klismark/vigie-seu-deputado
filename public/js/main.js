define(["jquery","actions","request","view"],function(){var a=require("actions"),b=require("request");allCongressmen=[],$("#btn-open-accessibility").click(a.openAccessibility),$("#btn-close-accessibility").click(a.closeAccessibility),a.openLoadingMain(),b.getParties(function(a){var b=require("view");allCongressmen=a,b.buildComboParties(".select-party",a,function(){var a=require("actions");a.closeLoadingMain()})}),$("#link-all-congressmen").click(a.openAllCongressmen),$("#filter-uf-list").change(a.filterCongressmenByUF)});