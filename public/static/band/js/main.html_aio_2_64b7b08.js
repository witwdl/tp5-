/*!dep/jquery-placeholder/jquery-placeholder-2.3.0/jquery.placeholder.js*/
;!function (a) {
    "function" == typeof define && define.amd ? define("dep/jquery-placeholder/jquery-placeholder-2.3.0/jquery.placeholder", ["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function (a) {
    function c(c) {
        var h = {}, v = /^jQuery\d+$/;
        return a.each(c.attributes, function (i, a) {
            a.specified && !v.test(a.name) && (h[a.name] = a.value)
        }), h
    }

    function h(c, h) {
        var v = this, b = a(this);
        if (v.value === b.attr(w ? "placeholder-x" : "placeholder") && b.hasClass(H.customClass)) if (v.value = "", b.removeClass(H.customClass), b.data("placeholder-password")) {
            if (b = b.hide().nextAll('input[type="password"]:first').show().attr("id", b.removeAttr("id").data("placeholder-id")), c === !0) return b[0].value = h, h;
            b.focus()
        } else v == y() && v.select()
    }

    function v(v) {
        var y, b = this, C = a(this), j = b.id;
        if (!v || "blur" !== v.type || !C.hasClass(H.customClass)) if ("" === b.value) {
            if ("password" === b.type) {
                if (!C.data("placeholder-textinput")) {
                    try {
                        y = C.clone().prop({type: "text"})
                    } catch (e) {
                        y = a("<input>").attr(a.extend(c(this), {type: "text"}))
                    }
                    y.removeAttr("name").data({
                        "placeholder-enabled": !0,
                        "placeholder-password": C,
                        "placeholder-id": j
                    }).bind("focus.placeholder", h), C.data({"placeholder-textinput": y, "placeholder-id": j}).before(y)
                }
                b.value = "", C = C.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", C.data("placeholder-id")).show()
            } else {
                var A = C.data("placeholder-password");
                A && (A[0].value = "", C.attr("id", C.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))
            }
            C.addClass(H.customClass), C[0].value = C.attr(w ? "placeholder-x" : "placeholder")
        } else C.removeClass(H.customClass)
    }

    function y() {
        try {
            return document.activeElement
        } catch (a) {
        }
    }

    var b, C, w = !1, j = "[object OperaMini]" === Object.prototype.toString.call(window.operamini),
        A = "placeholder" in document.createElement("input") && !j && !w,
        g = "placeholder" in document.createElement("textarea") && !j && !w, E = a.valHooks, k = a.propHooks, H = {};
    A && g ? (C = a.fn.placeholder = function () {
        return this
    }, C.input = !0, C.textarea = !0) : (C = a.fn.placeholder = function (c) {
        var y = {customClass: "placeholder"};
        return H = a.extend({}, y, c), this.filter((A ? "textarea" : ":input") + "[" + (w ? "placeholder-x" : "placeholder") + "]").not("." + H.customClass).not(":radio, :checkbox, :hidden").bind({
            "focus.placeholder": h,
            "blur.placeholder": v
        }).data("placeholder-enabled", !0).trigger("blur.placeholder")
    }, C.input = A, C.textarea = g, b = {
        get: function (c) {
            var h = a(c), v = h.data("placeholder-password");
            return v ? v[0].value : h.data("placeholder-enabled") && h.hasClass(H.customClass) ? "" : c.value
        }, set: function (c, b) {
            var C, w, j = a(c);
            return "" !== b && (C = j.data("placeholder-textinput"), w = j.data("placeholder-password"), C ? (h.call(C[0], !0, b) || (c.value = b), C[0].value = b) : w && (h.call(c, !0, b) || (w[0].value = b), c.value = b)), j.data("placeholder-enabled") ? ("" === b ? (c.value = b, c != y() && v.call(c)) : (j.hasClass(H.customClass) && h.call(c), c.value = b), j) : (c.value = b, j)
        }
    }, A || (E.input = b, k.value = b), g || (E.textarea = b, k.value = b), a(function () {
        a(document).delegate("form", "submit.placeholder", function () {
            var c = a("." + H.customClass, this).each(function () {
                h.call(this, !0, "")
            });
            setTimeout(function () {
                c.each(v)
            }, 10)
        })
    }), a(window).bind("beforeunload.placeholder", function () {
        var c = !0;
        try {
            "javascript:void(0)" === document.activeElement.toString() && (c = !1)
        } catch (h) {
        }
        c && a("." + H.customClass).each(function () {
            this.value = ""
        })
    }))
});
/*!common/components/jquery-checkbox/jquery.checkbox.js*/
;define("common/components/jquery-checkbox/jquery.checkbox", ["require", "exports", "module"], function () {
    +function (c) {
        "use strict";

        function a() {
            c(k).parent().addClass("box_checkbox"), c(k).before("<span></span>");
            c(k).parent().find("span").addClass("checkbox_icon");
            c(k).parent().each(function () {
                var a = c(this).children(":checkbox").attr("data-text");
                c(this).children(":checkbox").after(a), c(this).children().hasClass("screenbox") ? c(this).parent().find("span").css({
                    "background-position": "-27px 0",
                    width: "15px"
                }) : (c(this).parent().find("span").css("background-position", "-13px 1px"), c(this).parent().find("input").attr("checked", "checked"))
            })
        }

        function h(a) {
            return this.each(function () {
                var h = c(this), k = h.data("lg.checkbox");
                k || h.data("lg.checkbox", k = new b(this)), "string" == typeof a && k[a].call(h)
            })
        }

        var k = ".checkbox", b = function (c) {
            c.on("click.lg.checkbox", this.checkbox)
        };
        b.prototype.checkbox = function () {
            var a = c(this);
            a.is(":checked") ? a.hasClass("screenbox") ? a.parent().find("span").css({
                "background-position": "-42px 0",
                width: "18px"
            }) : a.parent().find("span").css("background-position", "-13px 1px") : a.hasClass("screenbox") ? a.parent().find("span").css({
                "background-position": "-27px 0",
                width: "15px"
            }) : a.parent().find("span").css("background-position", "0 3px")
        };
        var g = c.fn.checkbox;
        c.fn.checkbox = h, c.fn.checkbox.Constructor = b, c.fn.checkbox.noConflict = function () {
            return c.fn.checkbox = g, this
        }, a(), c(document).on("click.lg.click", k, b.prototype.checkbox)
    }(jQuery)
});
/*!common/components/jquery-validate/jquery-validate.js*/
;define("common/components/jquery-validate/jquery-validate", ["require", "exports", "module"], function () {
    !function (a) {
        a.extend(a.fn, {
            validate: function (h) {
                if (!this.length) return void(h && h.debug && window.console && console.warn("nothing selected, can't validate, returning nothing"));
                var c = a.data(this[0], "validator");
                return c ? c : (c = new a.validator(h, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function (h) {
                    c.settings.submitHandler && (c.submitButton = h.target), a(h.target).hasClass("cancel") && (c.cancelSubmit = !0)
                }), this.submit(function (h) {
                    function d() {
                        var d;
                        return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(c.submitButton.value).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, h), c.submitButton && d.remove(), !1) : !0
                    }

                    return void 0 != window.tinyMCE && tinyMCE.triggerSave(), c.settings.debug && h.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
                })), c)
            }, valid: function () {
                var h, c;
                return a(this[0]).is("form") ? this.validate().form() : (h = !0, c = a(this[0].form).validate(), this.each(function () {
                    h &= c.element(this)
                }), h)
            }, removeAttrs: function (h) {
                var c = {}, d = this;
                return a.each(h.split(/\s/), function (a, h) {
                    c[h] = d.attr(h), d.removeAttr(h)
                }), c
            }, rules: function (h, c) {
                var e, f, g, F, i, v, d = this[0];
                if (h) switch (e = a.data(d.form, "validator").settings, f = e.rules, g = a.validator.staticRules(d), h) {
                    case"add":
                        a.extend(g, a.validator.normalizeRule(c)), f[d.name] = g, c.messages && (e.messages[d.name] = a.extend(e.messages[d.name], c.messages));
                        break;
                    case"remove":
                        return c ? (F = {}, a.each(c.split(/\s/), function (a, h) {
                            F[h] = g[h], delete g[h]
                        }), F) : (delete f[d.name], g)
                }
                return i = a.validator.normalizeRules(a.extend({}, a.validator.metadataRules(d), a.validator.classRules(d), a.validator.attributeRules(d), a.validator.staticRules(d)), d), i.required && (v = i.required, delete i.required, i = a.extend({required: v}, i)), i
            }
        }), a.extend(a.expr[":"], {
            blank: function (h) {
                return !a.trim("" + h.value)
            }, filled: function (h) {
                return !!a.trim("" + h.value)
            }, unchecked: function (a) {
                return !a.checked
            }
        }), a.validator = function (h, c) {
            this.settings = a.extend(!0, {}, a.validator.defaults, h), this.currentForm = c, this.init()
        }, a.validator.format = function (h, c) {
            return 1 === arguments.length ? function () {
                var c = a.makeArray(arguments);
                return c.unshift(h), a.validator.format.apply(this, c)
            } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
                h = h.replace(new RegExp("\\{" + a + "\\}", "g"), c)
            }), h)
        }, a.extend(a.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "span",
                focusInvalid: !0,
                errorContainer: a([]),
                errorLabelContainer: a([]),
                onsubmit: !0,
                ignore: "",
                ignoreTitle: !1,
                onfocusin: function (a) {
                    this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(a)).hide())
                },
                onfocusout: function (a) {
                    this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
                },
                onkeyup: function (a, h) {
                    (9 != h.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastActive) && this.element(a)
                },
                onclick: function (a) {
                    a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
                },
                highlight: function (h, c, d) {
                    "radio" === h.type ? this.findByName(h.name).addClass(c).removeClass(d) : a(h).addClass(c).removeClass(d)
                },
                unhighlight: function (h, c, d) {
                    "radio" === h.type ? this.findByName(h.name).removeClass(c).addClass(d) : a(h).removeClass(c).addClass(d)
                }
            },
            setDefaults: function (h) {
                a.extend(a.validator.defaults, h)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: a.validator.format("Please enter no more than {0} characters."),
                minlength: a.validator.format("Please enter at least {0} characters."),
                rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
                range: a.validator.format("Please enter a value between {0} and {1}."),
                max: a.validator.format("Please enter a value less than or equal to {0}."),
                min: a.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function d(h) {
                        var c = a.data(this[0].form, "validator"), d = "on" + h.type.replace(/^validate/, "");
                        c.settings[d] && c.settings[d].call(c, this[0], h)
                    }

                    var h, c;
                    this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset(), h = this.groups = {}, a.each(this.settings.groups, function (c, d) {
                        a.each(d.split(/\s/), function (a, d) {
                            h[d] = c
                        })
                    }), c = this.settings.rules, a.each(c, function (h, d) {
                        c[h] = a.validator.normalizeRule(d)
                    }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", d).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", d), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                }, form: function () {
                    return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                }, checkForm: function () {
                    var a, h, c;
                    for (this.prepareForm(), a = 0, h = this.currentElements = this.elements(); h[a]; a++) if (void 0 != this.findByName(h[a].name).length && this.findByName(h[a].name).length > 1) for (c = 0; c < this.findByName(h[a].name).length; c++) this.check(this.findByName(h[a].name)[c]); else this.check(h[a]);
                    return this.valid()
                }, element: function (h) {
                    h = this.validationTargetFor(this.clean(h)), this.lastElement = h, this.prepareElement(h), this.currentElements = a(h);
                    var c = this.check(h) !== !1;
                    return c ? delete this.invalid[h.name] : this.invalid[h.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), c
                }, showErrors: function (h) {
                    if (h) {
                        a.extend(this.errorMap, h), this.errorList = [];
                        for (var c in h) this.errorList.push({message: h[c], element: this.findByName(c)[0]});
                        this.successList = a.grep(this.successList, function (a) {
                            return !(a.name in h)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                }, resetForm: function () {
                    a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                }, numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                }, objectLength: function (a) {
                    var h = 0;
                    for (c in a) h++;
                    return h
                }, hideErrors: function () {
                    this.addWrapper(this.toHide).hide()
                }, valid: function () {
                    return 0 === this.size()
                }, size: function () {
                    return this.errorList.length
                }, focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (h) {
                    }
                }, findLastActive: function () {
                    var h = this.lastActive;
                    return h && 1 === a.grep(this.errorList, function (a) {
                        return a.element.name === h.name
                    }).length && h
                }, elements: function () {
                    var h = this, c = {};
                    return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        return !this.name && h.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !h.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                    })
                }, clean: function (h) {
                    return a(h)[0]
                }, errors: function () {
                    var h = this.settings.errorClass.replace(" ", ".");
                    return a(this.settings.errorElement + "." + h, this.errorContext)
                }, reset: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
                }, prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                }, prepareElement: function (a) {
                    this.reset(), this.toHide = this.errorsFor(a)
                }, elementValue: function (h) {
                    var c = a(h).attr("type"), d = a(h).val();
                    return "radio" === c || "checkbox" === c ? a('input[name="' + a(h).attr("name") + '"]:checked').val() : "string" == typeof d ? d.replace(/\r/g, "") : d
                }, check: function (h) {
                    var c, d, e, f, g, F;
                    h = this.validationTargetFor(this.clean(h)), c = a(h).rules(), d = !1, e = this.elementValue(h);
                    for (g in c) {
                        F = {method: g, parameters: c[g]};
                        try {
                            if (f = a.validator.methods[g].call(this, e, h, F.parameters), "dependency-mismatch" === f) {
                                d = !0;
                                continue
                            }
                            if (d = !1, "pending" === f) return void(this.toHide = this.toHide.not(this.errorsFor(h)));
                            if (!f) return this.formatAndAdd(h, F), !1
                        } catch (i) {
                            throw this.settings.debug && window.console && console.log("exception occured when checking element " + h.id + ", check the '" + F.method + "' method", i), i
                        }
                    }
                    return d ? void 0 : (this.objectLength(c) && this.successList.push(h), !0)
                }, customMetaMessage: function (h, c) {
                    if (a.metadata) {
                        var d = this.settings.meta ? a(h).metadata()[this.settings.meta] : a(h).metadata();
                        return d && d.messages && d.messages[c]
                    }
                }, customDataMessage: function (h, c) {
                    return a(h).data("msg-" + c.toLowerCase()) || h.attributes && a(h).attr("data-msg-" + c.toLowerCase())
                }, customMessage: function (a, h) {
                    var c = this.settings.messages[a];
                    return c && (c.constructor === String ? c : c[h])
                }, findDefined: function () {
                    for (var a = 0; a < arguments.length; a++) if (void 0 !== arguments[a]) return arguments[a];
                    return void 0
                }, defaultMessage: function (h, c) {
                    return this.findDefined(this.customMessage(h.name, c), this.customDataMessage(h, c), this.customMetaMessage(h, c), !this.settings.ignoreTitle && h.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + h.name + "</strong>")
                }, formatAndAdd: function (h, c) {
                    var d = this.defaultMessage(h, c.method), e = /\$?\{(\d+)\}/g;
                    "function" == typeof d ? d = d.call(this, c.parameters, h) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                        message: d,
                        element: h
                    }), this.errorMap[h.name] = d, this.submitted[h.name] = d
                }, addWrapper: function (a) {
                    return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
                }, defaultShowErrors: function () {
                    var a, h, c;
                    for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                    if (this.settings.unhighlight) for (a = 0, h = this.validElements(); h[a]; a++) this.settings.unhighlight.call(this, h[a], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                }, validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                }, invalidElements: function () {
                    return a(this.errorList).map(function () {
                        return this.element
                    })
                }, showLabel: function (h, c) {
                    var d = this.errorsFor(h);
                    d.length ? (d.removeClass(this.settings.validClass).addClass(this.settings.errorClass), d.attr("generated") && d.html(c)) : (d = a("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(h),
                        generated: !0
                    }).addClass(this.settings.errorClass).html(c || ""), this.settings.wrapper && (d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, a(h)) : d.insertAfter(a(h)))), !c && this.settings.success && (d.text("").append('<em class="error_arrow"></em>'), "string" == typeof this.settings.success ? d.addClass(this.settings.success) : this.settings.success(d, h)), this.toShow = this.toShow.add(d)
                }, errorsFor: function (h) {
                    var c = this.idOrName(h);
                    return this.errors().filter(function () {
                        return a(this).attr("for") === c
                    })
                }, idOrName: function (a) {
                    return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
                }, validationTargetFor: function (a) {
                    return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a
                }, checkable: function (a) {
                    return /radio|checkbox/i.test(a.type)
                }, findByName: function (h) {
                    return a(this.currentForm).find('[name="' + h + '"]')
                }, getLength: function (h, c) {
                    switch (c.nodeName.toLowerCase()) {
                        case"select":
                            return a("option:selected", c).length;
                        case"input":
                            if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                    }
                    return h.length
                }, depend: function (a, h) {
                    return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, h) : !0
                }, dependTypes: {
                    "boolean": function (a) {
                        return a
                    }, string: function (h, c) {
                        return !!a(h, c.form).length
                    }, "function": function (a, h) {
                        return a(h)
                    }
                }, optional: function (h) {
                    var c = this.elementValue(h);
                    return !a.validator.methods.required.call(this, c, h) && "dependency-mismatch"
                }, startRequest: function (a) {
                    this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
                }, stopRequest: function (h, c) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[h.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                }, previousValue: function (h) {
                    return a.data(h, "previousValue") || a.data(h, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(h, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {required: !0},
                email: {email: !0},
                url: {url: !0},
                date: {date: !0},
                dateISO: {dateISO: !0},
                number: {number: !0},
                digits: {digits: !0},
                creditcard: {creditcard: !0}
            },
            addClassRules: function (h, c) {
                h.constructor === String ? this.classRuleSettings[h] = c : a.extend(this.classRuleSettings, h)
            },
            classRules: function (h) {
                var c = {}, d = a(h).attr("class");
                return d && a.each(d.split(" "), function () {
                    this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
                }), c
            },
            attributeRules: function (h) {
                var e, f, c = {}, d = a(h);
                for (e in a.validator.methods) "required" === e ? (f = d.get(0).getAttribute(e), "" === f && (f = !0), f = !!f) : f = d.attr(e), f ? c[e] = f : d[0].getAttribute("type") === e && (c[e] = !0);
                return c.maxlength && /-1|2147483647|524288/.test(c.maxlength) && delete c.maxlength, c
            },
            metadataRules: function (h) {
                if (!a.metadata) return {};
                var c = a.data(h.form, "validator").settings.meta;
                return c ? a(h).metadata()[c] : a(h).metadata()
            },
            staticRules: function (h) {
                var c = {}, d = a.data(h.form, "validator");
                return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[h.name]) || {}), c
            },
            normalizeRules: function (h, c) {
                return a.each(h, function (d, e) {
                    if (e === !1) return void delete h[d];
                    if (e.param || e.depends) {
                        var f = !0;
                        switch (typeof e.depends) {
                            case"string":
                                f = !!a(e.depends, c.form).length;
                                break;
                            case"function":
                                f = e.depends.call(c, c)
                        }
                        f ? h[d] = void 0 !== e.param ? e.param : !0 : delete h[d]
                    }
                }), a.each(h, function (d, e) {
                    h[d] = a.isFunction(e) ? e(c) : e
                }), a.each(["minlength", "maxlength", "min", "max"], function () {
                    h[this] && (h[this] = Number(h[this]))
                }), a.each(["rangelength", "range"], function () {
                    h[this] && (h[this] = [Number(h[this][0]), Number(h[this][1])])
                }), a.validator.autoCreateRanges && (h.min && h.max && (h.range = [h.min, h.max], delete h.min, delete h.max), h.minlength && h.maxlength && (h.rangelength = [h.minlength, h.maxlength], delete h.minlength, delete h.maxlength)), h.messages && delete h.messages, h
            },
            normalizeRule: function (h) {
                if ("string" == typeof h) {
                    var c = {};
                    a.each(h.split(/\s/), function () {
                        c[this] = !0
                    }), h = c
                }
                return h
            },
            addMethod: function (h, c, d) {
                a.validator.methods[h] = c, a.validator.messages[h] = void 0 !== d ? d : a.validator.messages[h], c.length < 3 && a.validator.addClassRules(h, a.validator.normalizeRule(h))
            },
            methods: {
                required: function (h, c, d) {
                    if (!this.depend(d, c)) return "dependency-mismatch";
                    if ("select" === c.nodeName.toLowerCase()) {
                        var e = a(c).val();
                        return e && e.length > 0
                    }
                    return this.checkable(c) ? this.getLength(h, c) > 0 : (h == a(c).attr("placeholder") && (h = ""), a.trim(h).length > 0)
                }, remote: function (h, c, d) {
                    var e, f, g;
                    return this.optional(c) ? "dependency-mismatch" : (e = this.previousValue(c), this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), e.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = e.message, d = "string" == typeof d && {url: d} || d, this.pending[c.name] ? "pending" : e.old === h ? e.valid : (e.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = h, a.ajax(a.extend(!0, {
                        url: d,
                        mode: "abort",
                        port: "validate" + c.name,
                        dataType: "json",
                        data: g,
                        success: function (d) {
                            var g, F, i, v;
                            f.settings.messages[c.name].remote = e.originalMessage, g = d === !0 || "true" === d, g ? (F = f.formSubmitted, f.prepareElement(c), f.formSubmitted = F, f.successList.push(c), delete f.invalid[c.name], f.showErrors()) : (i = {}, v = d || f.defaultMessage(c, "remote"), i[c.name] = e.message = a.isFunction(v) ? v(h) : v, f.invalid[c.name] = !0, f.showErrors(i)), e.valid = g, f.stopRequest(c, g)
                        }
                    }, d)), "pending"))
                }, minlength: function (h, c, d) {
                    var e = a.isArray(h) ? h.length : this.getLength(a.trim(h), c);
                    return this.optional(c) || e >= d
                }, maxlength: function (h, c, d) {
                    var e = a.isArray(h) ? h.length : this.getLength(a.trim(h), c);
                    return this.optional(c) || d >= e
                }, rangelength: function (h, c, d) {
                    var e = a.isArray(h) ? h.length : this.getLength(a.trim(h), c);
                    return this.optional(c) || e >= d[0] && e <= d[1]
                }, min: function (a, h, c) {
                    return this.optional(h) || a >= c
                }, max: function (a, h, c) {
                    return this.optional(h) || c >= a
                }, range: function (a, h, c) {
                    return this.optional(h) || a >= c[0] && a <= c[1]
                }, email: function (h, c) {
                    return h = a.trim(h), this.optional(c) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(h)
                }, url: function (a, h) {
                    return this.optional(h) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
                }, date: function (a, h) {
                    return this.optional(h) || !/Invalid|NaN/.test(new Date(a))
                }, dateISO: function (a, h) {
                    return this.optional(h) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)
                }, number: function (a, h) {
                    return this.optional(h) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
                }, digits: function (a, h) {
                    return this.optional(h) || /^\d+$/.test(a)
                }, creditcard: function (a, h) {
                    var c, d, e, f, g;
                    if (this.optional(h)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(a)) return !1;
                    for (c = 0, d = 0, e = !1, a = a.replace(/\D/g, ""), f = a.length - 1; f >= 0; f--) g = a.charAt(f), d = parseInt(g, 10), e && (d *= 2) > 9 && (d -= 9), c += d, e = !e;
                    return 0 === c % 10
                }, equalTo: function (h, c, d) {
                    var e = a(d);
                    return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        a(c).valid()
                    }), h === e.val()
                }
            }
        }), a.format = a.validator.format
    }(jQuery), function (a) {
        var h, c = {};
        a.ajaxPrefilter ? a.ajaxPrefilter(function (a, h, d) {
            var e = a.port;
            "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
        }) : (h = a.ajax, a.ajax = function (d) {
            var e = ("mode" in d ? d : a.ajaxSettings).mode, f = ("port" in d ? d : a.ajaxSettings).port;
            return "abort" === e ? (c[f] && c[f].abort(), c[f] = h.apply(this, arguments)) : h.apply(this, arguments)
        })
    }(jQuery), function (a) {
        jQuery.event.special.focusin || jQuery.event.special.focusout || !document.addEventListener || a.each({
            focus: "focusin",
            blur: "focusout"
        }, function (h, c) {
            function d(h) {
                return h = a.event.fix(h), h.type = c, a.event.handle.call(this, h)
            }

            a.event.special[c] = {
                setup: function () {
                    this.addEventListener(h, d, !0)
                }, teardown: function () {
                    this.removeEventListener(h, d, !0)
                }, handler: function (h) {
                    var d = arguments;
                    return d[0] = a.event.fix(h), d[0].type = c, a.event.handle.apply(this, d)
                }
            }
        }), a.extend(a.fn, {
            validateDelegate: function (h, c, d) {
                return this.bind(c, function (c) {
                    var e = a(c.target);
                    return e.is(h) ? d.apply(e, arguments) : void 0
                })
            }
        })
    }(jQuery)
});
/*!common/widgets/lagou-ui/lagou.js*/
;define("common/widgets/lagou-ui/lagou", ["require", "exports", "module"], function (require, exports, module) {
    var lg = window.lg || {};
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a) {
        var g = this.length >>> 0, h = Number(arguments[1]) || 0;
        for (h = 0 > h ? Math.ceil(h) : Math.floor(h), 0 > h && (h += g); g > h; h++) if (h in this && this[h] === a) return h;
        return -1
    }), String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "")
    }, String.prototype.ltrim = function () {
        return this.replace(/(^\s*)/g, "")
    }, String.prototype.rtrim = function () {
        return this.replace(/(\s*$)/g, "")
    }), lg.Event = lg.Event || {}, lg.Event._events = {}, lg.Event.on = function (a, g, h) {
        return this._events[a] = this._events[a] || [], this._events[a].push({data: g, func: h}), this
    }, lg.Event.un = function (a) {
        var g = this._events;
        if (0 === arguments.length) return this._events = {}, this;
        var h = g[a];
        if (!h) return this;
        if (1 === arguments.length) return delete g[a], this;
        for (var c, i = 0; i < h.length; i++) if (c = h[i], c === listener || c.listener === listener) {
            h.splice(i, 1);
            break
        }
        return this
    }, lg.Event.exec = function (a) {
        var g = this._events, h = g[a], c = Array.prototype.slice.call(arguments, 1);
        if (h) {
            h = h.slice(0);
            for (var i = 0, v = h.length; v > i; i++) h[i].apply(this, c)
        }
        return this
    }, lg.Cache = lg.Cache || {}, lg.Cache.Views = lg.Cache.Views || {}, lg.Utils = lg.Utils || {}, lg.Utils.isNullObject = function (a) {
        if ("object" == typeof a && !(a instanceof Array)) {
            var g = !1;
            for (var h in a) {
                g = !0;
                break
            }
            return g
        }
    }, lg.Widgets = lg.Widgets || {}, lg.Widgets.BaseControl = function (a) {
        if (this._name = "", this._option = {}, this.Event = lg.Event, this._data = {}, this._value = "", this._isDirty = !1, this._isValueField = !0, this._data.valid = this._data.valid || {}, this._data.valid.validResult = {}, this._data.valid._map = {
                require: {
                    mode: "require",
                    isUse: !1,
                    status: !1,
                    data: "",
                    message: "必填",
                    level: "3",
                    trigger: []
                },
                re_pwd: {
                    mode: "repeat-password",
                    isUse: !1,
                    status: !1,
                    data: "",
                    message: "",
                    level: "2",
                    trigger: []
                },
                min_len: {
                    mode: "min-length",
                    isUse: !1,
                    status: !1,
                    data: "",
                    message: "最小长度",
                    level: "1",
                    trigger: []
                },
                max_len: {
                    mode: "max-length",
                    isUse: !1,
                    status: !1,
                    data: "",
                    message: "最大长度",
                    level: "1",
                    trigger: []
                },
                pattern: {mode: "pattern", isUse: !1, status: !1, data: "", message: "", level: "2", trigger: []}
            }, $.extend(this._option, a), this._option.validRules) for (var i = 0, g = this._option.validRules.length; g > i; i++) {
            var h = this._option.validRules[i];
            this._data.valid._map[h.mode] ? (this._data.valid._map[h.mode].isUse = !0, this._data.valid._map[h.mode].data = h.data, this._data.valid._map[h.mode].message = h.message, this._data.valid._map[h.mode].level = h.level || this._data.valid._map[h.mode].level) : this._data.valid._map[h.mode] = {
                mode: h.mode,
                isUse: !0,
                status: !1,
                data: h.data,
                message: h.message,
                level: 0
            }, h.trigger ? this._data.valid._map[h.mode].trigger = h.trigger.split(",") : this._data.valid._map[h.mode].trigger.push("blur")
        }
        this._selector = '[data-view="' + this._option.parentName + '"] [data-propertyname="' + this._option.name + '"]', this._element = "string" == typeof this._option.name ? $(this._selector) : this._option.name, "function" == typeof this.init ? this.init() : ""
    }, lg.Widgets.BaseControl.prototype.getIsValueField = function () {
        return this._isValueField
    }, lg.Widgets.BaseControl.prototype.setIsValueField = function (a) {
        var g = !1;
        a && (g = !0), this._isValueField = g
    }, lg.Widgets.BaseControl.prototype.getName = function () {
        return this._option.name
    }, lg.Widgets.BaseControl.prototype.getElement = function () {
        return this._element
    }, lg.Widgets.BaseControl.prototype.BaseInit = function (a) {
        this.setData(a);
        var g = this, h = !0;
        this._option.isFocusShow || this.getElement().find('input[type="text"],input[type="password"],input[type="checkbox"],input.btn_outline').on("focus", function () {
            g.setValidMessage()
        }), "undefined" == typeof this._option.isVisible ? h : h = !1, this.setVisible(h), this.getElement().find('input[type="text"],input[type="password"]').on("blur keydown change keyup", {control: this}, function (e) {
            var a = e.data.control;
            "keydown" == e.type && (a._isDirty = !0);
            var g = a.getValue(), h = a.getIsValid(g, e.type);
            return a._isDirty && a.getSelfIsValided() && ("keyup" == e.type || "change" == e.type) ? a._option.keyup && (a.execValid(a.getValue()), a._option.keyup.call(this, {
                control: a,
                isValidat: !0,
                parent: lg.Cache.Views[a._option.parentName],
                linkFor: lg.Cache.Views[a._option.parentName].field[a._option.linkFor]
            })) : !a._isDirty || a.getSelfIsValided() || "keyup" != e.type && "change" != e.type || a._option.keyup && (a.execValid(a.getValue()), a._option.keyup.call(this, {
                control: a,
                isValidat: !1,
                parent: lg.Cache.Views[a._option.parentName],
                linkFor: lg.Cache.Views[a._option.parentName].field[a._option.linkFor]
            })), lg.Utils.isNullObject(h) ? void a.setValidMessage(h) : void a.setValidMessage()
        })
    }, lg.Widgets.BaseControl.prototype.showMessage = function (a) {
        this.getElement().find("[data-valid-message]").length ? "" : this.getElement().append('<span data-valid-message class="input_tips"></span>');
        {
            var g = this.getElement().find("[data-valid-message]");
            g.html()
        }
        if (lg.Utils.isNullObject(a)) {
            g.empty();
            g.html(a.message), g.show(), this.getElement().find('input[type="text"]').addClass("input_warning"), this.getElement().find('input[type="password"]').addClass("input_warning")
        } else g.remove(), this.getElement().find('input[type="text"]').removeClass("input_warning"), this.getElement().find('input[type="password"]').removeClass("input_warning")
    }, lg.Widgets.BaseControl.prototype.setValidMessage = function (a, g) {
        if (this._option.forbidAddMessageBySelf) if ("CollectData" == g) {
            this.getElement().find("[data-valid-message]").length ? "" : this.getElement().append('<span data-valid-message class="input_tips"></span>');
            var h = this.getElement().find("[data-valid-message]")
        } else {
            var h = this.getElement().find("[data-valid-message]");
            if (!h && h.length > 0) return
        } else {
            this.getElement().find("[data-valid-message]").length ? "" : this.getElement().append('<span data-valid-message class="input_tips"></span>');
            var h = this.getElement().find("[data-valid-message]")
        }
        h.html();
        if (lg.Utils.isNullObject(a || {})) {
            h.empty();
            var c = "", v = 0;
            for (var _ in a) "undefined" != typeof a[_].level ? v = v < a[_].level ? a[_].level : v : "";
            for (var _ in a) "undefined" != typeof a[_].level && v == a[_].level && (c = a[_].message);
            h.html(c), h.show(), this.getElement().find('input[type="text"]').addClass("input_warning"), this.getElement().find('input[type="password"]').addClass("input_warning")
        } else h.remove(), this.getElement().find('input[type="text"]').removeClass("input_warning"), this.getElement().find('input[type="password"]').removeClass("input_warning")
    }, lg.Widgets.BaseControl.prototype.setData = function (a) {
        for (var g in a) this["set" + g] = a[g]
    }, lg.Widgets.BaseControl.prototype.setClear = function () {
        this.getElement().find("input.input_warning").removeClass("input_warning"), this.getElement().find("[data-valid-message]").remove(), this.getElement().find('input[type="text"],input[type="password"]').val(""), this._isDirty = !1, this.getElement().find('input[type="text"],input[type="password"]').blur()
    }, lg.Widgets.BaseControl.prototype.getIsReadOnly = function () {
        return this.getElement().attr("readonly") ? !0 : !1
    }, lg.Widgets.BaseControl.prototype.setReadOnly = function (a) {
        var g = !1;
        a && (g = !0), g ? this.getElement().attr("readonly", g) : this.getElement().removeAttr("readonly")
    }, lg.Widgets.BaseControl.prototype.getIsDisabled = function () {
        return this.getElement().attr("disabled") ? !0 : !1
    }, lg.Widgets.BaseControl.prototype.setFocus = function (a) {
        var g = !1;
        a && (g = !0, this.getElement().find('input[type ="text"]').focus())
    }, lg.Widgets.BaseControl.prototype.setDisable = function (a) {
        var g = !1;
        a && (g = !0), g ? this.getElement().attr("disabled", g) : this.getElement().removeAttr("disabled"), g ? (this.getElement().attr("disabled", g), this.getElement().find('input[type="button"]').attr("disabled", g)) : (this.getElement().removeAttr("disabled"), this.getElement().find('input[type="button"]').removeAttr("disabled"))
    }, lg.Widgets.BaseControl.prototype.getIsVisible = function () {
        return "none" != this.getElement().css("display") ? !0 : !1
    }, lg.Widgets.BaseControl.prototype.setVisible = function (a) {
        var g = "none";
        a && (g = "block"), this.getElement().css("display", g)
    }, lg.Widgets.BaseControl.prototype.getIsValid = function (a, g) {
        return this.execValid(a, g), this._data.valid.validResult
    }, lg.Widgets.BaseControl.prototype.setValid = function (a) {
        for (var g in a) this._data.valid._map[g].is = a[g]
    }, lg.Widgets.BaseControl.prototype.getValue = function () {
        return this._value = "undefined" == typeof this.getElement().find('input[type="text"]').val() ? this.getElement().find('input[type="password"]').val() : this.getElement().find('input[type="text"]').val(), this._value = "undefined" == typeof this._value ? "" : this._value, this._value = this._value.trim(), this._value
    }, lg.Widgets.BaseControl.prototype.setValue = function (a) {
        this._value = this.getElement().find('input[type="text"]').val(a) || this.getElement().find('input[type="password"]').val(a)
    }, lg.Widgets.BaseControl.prototype.execValid = function (val, type) {
        var thisType = type || "blur";
        if ("undefined" != typeof val && this.getIsVisible()) for (var item in this._data.valid._map) if ("object" == typeof this._data.valid._map[item] && this._data.valid._map[item].isUse) {
            if ("require" == this._data.valid._map[item].mode && this.controlValidResult(0 == val.length && this._isDirty && this._data.valid._map[item].trigger.indexOf(thisType) > -1, item, type), "min-len" == this._data.valid._map[item].mode && this.controlValidResult(val.length < this._data.valid._map[item].data && this._isDirty && this._data.valid._map[item].trigger.indexOf(thisType) > -1, item, type), "max-len" == this._data.valid._map[item].mode && this.controlValidResult(val.length > this._data.valid._map[item].data && this._isDirty && this._data.valid._map[item].trigger.indexOf(thisType) > -1, item, type), "repeat-password" == this._data.valid._map[item].mode) {
                var pwd = lg.Cache.Views[this._option.parentName].field[this._option.linkFor].getValue(),
                    repwd = this.getValue();
                this.controlValidResult(pwd != repwd && this._isDirty && this._data.valid._map[item].trigger.indexOf(thisType) > -1, item, type)
            }
            if ("pattern" == this._data.valid._map[item].mode) {
                if ("string" == typeof this._data.valid._map[item].data) for (var data = this._data.valid._map[item].data.split("||"), temp = !1, i = 0, len = data.length; len > i; i++) {
                    var reg = eval(data[i]);
                    temp = temp || reg.test(val)
                } else {
                    var data = this._data.valid._map[item].data, temp = !1;
                    for (var i in data) "function" != typeof data[i] && (temp = temp || data[i].test(val))
                }
                this.controlValidResult(!temp && this._isDirty && this._data.valid._map[item].trigger.indexOf(thisType) > -1, item, type)
            }
        }
    }, lg.Widgets.BaseControl.prototype.getSelfIsValided = function () {
        var value = !0, val = this.getValue();
        if ("undefined" == typeof val) return !1;
        for (var item in this._data.valid._map) if ("object" == typeof this._data.valid._map[item] && this._data.valid._map[item].isUse) {
            if ("require" == this._data.valid._map[item].mode && (value = value && 0 != val.length ? !0 : !1), "min-len" == this._data.valid._map[item].mode && (value = value && val.length > this._data.valid._map[item].data ? !0 : !1), "max-len" == this._data.valid._map[item].mode && (value = value && val.length < this._data.valid._map[item].data ? !0 : !1), "repeat-password" == this._data.valid._map[item].mode) {
                var pwd = lg.Cache.Views[this._option.parentName].field[this._option.linkFor].getValue(),
                    repwd = this.getValue();
                value = value && pwd == repwd ? !0 : !1
            }
            if ("pattern" == this._data.valid._map[item].mode) {
                if ("string" == typeof this._data.valid._map[item].data) for (var data = this._data.valid._map[item].data.split("||"), temp = !1, i = 0, len = data.length; len > i; i++) {
                    var reg = eval(data[i]);
                    temp = temp || reg.test(val)
                } else {
                    var data = this._data.valid._map[item].data, temp = !1;
                    for (var i in data) "function" != typeof data[i] && (temp = temp || data[i].test(val))
                }
                value = value && temp ? !0 : !1
            }
        }
        return value
    }, lg.Widgets.BaseControl.prototype.controlValidResult = function (a, g, h) {
        a ? (this._data.valid.validResult[this._data.valid._map[g].mode] = this._data.valid._map[g], this._data.valid.validResult[this._data.valid._map[g].mode].triggerType = h) : delete this._data.valid.validResult[this._data.valid._map[g].mode]
    }, lg.Widgets.Controls = {}, lg.Widgets.Controls.Phone = function (a, g) {
        lg.Widgets.Controls[a] = g(a)
    }, lg.Widgets.Controls.Extend = function (a, g) {
        lg.Widgets.Controls[a] = g(a)
    }, lg.Widgets.Controls.Extend("Phone", function (a) {
        var g = function (a, g) {
            lg.Widgets.BaseControl.call(this, a, g)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g
    }), lg.Widgets.Controls.Extend("PhoneVerificationCode", function (a) {
        var g = function (a, g) {
            lg.Widgets.BaseControl.call(this, a, g)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g.prototype.getTopTime = function () {
            return this._option.topTime || 60
        }, g.prototype.setTopTime = function (a) {
            this._option.topTime = a
        }, g.prototype.getopCount = function () {
            return this._option.topCount || null
        }, g.prototype.getTotalCount = function () {
            return this._option.totalCount
        }, g.prototype.setTotalTimeTemp = function () {
            this.totalTimeTemp = this.getTopTime()
        }, g.prototype.setTimeLine = function (a) {
            this._option.timeLine = a
        }, g.prototype.getPhoneVerificationCodeUrl = function () {
            return this._option.url
        }, g.prototype.getVerificationButton = function () {
            return this.getElement().find('input[type="button"]')
        }, g.prototype.getVerificationInput = function () {
            return this.getElement().find('input[type="text"]')
        }, g.prototype.getCodeIsDisabled = function () {
            return this.getElement().find('input[type="button"]').hasClass("btn_disabled")
        }, g.prototype.setCodeIsDisabled = function (a) {
            var g = !1;
            return a ? (g = !0, this.getElement().find('input[type="button"]').addClass("btn_disabled"), g) : (this.getElement().find('input[type="button"]').removeClass("btn_disabled"), g)
        }, g.prototype.getLinkFor = function () {
            return lg.Cache.Views[this._option.parentName].field[this._option.linkFor]
        }, g.prototype.init = function () {
            this.timeLine = null, this.isActive = !1, this.setCodeIsDisabled(this._option.codeIsDisabled);
            var a = lg.Cache.Views[this._option.parentName].field[this._option.linkFor];
            !a.getSelfIsValided() && a._option.keyup ? this.getVerificationButton().val("string" != typeof this._option.postfix ? "获取验证码" : "获取") : a.getSelfIsValided() && a._option.keyup && this.getVerificationButton().removeClass("btn_disabled").val("string" != typeof this._option.postfix ? "获取验证码" : "获取"), this.totalTimeTemp = this.getTopTime(), this.getElement().find('input[type="button"]').one("click", {control: this}, function (e) {
                var a = e.data.control, g = !0, h = lg.Cache.Views[a._option.parentName].field[a._option.linkFor],
                    c = lg.Cache.Views[a._option.parentName].field[a._option.verifyCode];
                c && c.getIsVisible() && (g = c.getSelfIsValided() && g ? !0 : !1), g = h.getSelfIsValided() && g ? !0 : !1, g ? (a.setDisable(!0), !a.getCodeIsDisabled() && a.getIsDisabled() && (a.isActive = !0, a._option.click.call(this, {
                    control: a,
                    parent: lg.Cache.Views[a._option.parentName],
                    linkFor: h
                }))) : (h._isDirty = !0, h.setValidMessage(h.getIsValid(h.getValue()), "CollectData"), c && c.getIsVisible() && (c._isDirty = !0, c.setValidMessage(c.getIsValid(c.getValue()), "CollectData")), a.init())
            })
        }, g.prototype.getVerificationCode = function () {
        }, g.prototype.setClear = function () {
            this.getElement().find("input.input_warning").removeClass("input_warning"), this.getElement().find("[data-valid-message]").remove(), this.getElement().find('input[type="text"],input[type="password"]').val(""), this._isDirty = !1, this.getElement().find('input[type="text"],input[type="password"]').blur(), clearInterval(this.timeLine);
            var a = $._data(this.getElement().find('input[type="button"]')[0], "events");
            a && a.click || this.init(), this.timeLine = null, this.setDisable(!1);
            var g = lg.Cache.Views[this._option.parentName].field[this._option.linkFor];
            !g.getSelfIsValided() && g._option.keyup ? this.getVerificationButton().val("string" != typeof this._option.postfix ? "获取验证码" : "获取") : this.getVerificationButton().removeClass("btn_disabled").val("string" != typeof this._option.postfix ? "获取验证码" : "获取")
        }, g.prototype.starttime = function (a, g) {
            a.timeLine || (a.totalTimeTemp = a.getTopTime(), a.timeLine = setInterval(function () {
                var h = lg.Cache.Views[a._option.parentName].field[a.getName()];
                h.totalTimeTemp--;
                var c = "string" != typeof h._option.postfix ? "秒后重试" : h._option.postfix + "s";
                if (h.getVerificationButton().addClass("btn_disabled").val(h.totalTimeTemp + c), -1 == h.totalTimeTemp) {
                    clearInterval(h.timeLine), h.timeLine = null, a.setDisable(!1);
                    var v = lg.Cache.Views[a._option.parentName].field[a._option.linkFor];
                    !v.getSelfIsValided() && v._option.keyup ? (h.init(), h.getVerificationButton().val("string" != typeof h._option.postfix ? "获取验证码" : "获取")) : (h.init(), h.getVerificationButton().removeClass("btn_disabled").val("string" != typeof h._option.postfix ? "获取验证码" : "获取")), "function" == typeof g && g()
                }
            }, 1e3))
        }, g
    }), lg.Widgets.Controls.Extend("Password", function (a) {
        var g = function (a) {
            lg.Widgets.BaseControl.call(this, a)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g
    }), lg.Widgets.Controls.Extend("RepeatPassword", function (a) {
        var g = function (a) {
            lg.Widgets.BaseControl.call(this, a)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g
    }), lg.Widgets.Controls.Extend("Email", function (a) {
        var g = function (a) {
            lg.Widgets.BaseControl.call(this, a)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g
    }), lg.Widgets.Controls.Extend("VerifyCode", function (a) {
        var g = function (a) {
            lg.Widgets.BaseControl.call(this, a)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g.prototype.init = function () {
            this.getVerifyCodeReflashButton().on("click", {control: this}, function (e) {
                var a = e.data.control.getVerifyCodeUrl(),
                    g = $('<img alt="点击重试" class="yzm" width="98" height="40" />');
                if ("init" == e.data.type) {
                    if (e.data.control.getVerifyCodeImg().attr("src")) return;
                    g.attr("src", a), $('[data-controltype="VerifyCode"]').find("img").remove(), $('[data-controltype="VerifyCode"]').find("input").after(g)
                } else g.attr("src", a), $('[data-controltype="VerifyCode"]').find("img").remove(), $('[data-controltype="VerifyCode"]').find("input").after(g)
            })
        }, g.prototype.getVerifyCode = function () {
            this.getVerifyCodeReflashButton().trigger("click", {control: this, type: "init"})
        }, g.prototype.getFrom = function () {
            return this._option.from || "register"
        }, g.prototype.getVerifyCodeUrl = function () {
            var a = this._option.url + "?from=" + this.getFrom() + "&refresh=" + (new Date).getTime();
            return a
        }, g.prototype.getVerifyCodeReflashButton = function () {
            return this.getElement().find("a")
        }, g.prototype.getVerifyCodeInput = function () {
            return this.getElement().find("input")
        }, g.prototype.getVerifyCodeImg = function () {
            return this.getElement().find("img")
        }, g
    }), lg.Widgets.Controls.Extend("Switch", function (a) {
        var g = function (a) {
            lg.Widgets.BaseControl.call(this, a)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g.prototype.getValue = function () {
            return this.getElement().find(".btn_active").attr("data-myvalue") || ""
        }, g
    }), lg.Widgets.Controls.Extend("CheckBox", function (a) {
        var g = function (a) {
            lg.Widgets.BaseControl.call(this, a)
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g.prototype.getValue = function () {
            var a = [];
            return this.getElement().find('input[type="checkbox"]:checked').each(function () {
                a.push($(this).attr("data-myvalue"))
            }), a
        }, g
    }), lg.Widgets.Controls.Extend("Button", function (a) {
        var g = function (a) {
            lg.Widgets.BaseControl.call(this, a), this._isValueField = !1
        };
        return g.prototype = new lg.Widgets.BaseControl, g.prototype.controlType = a, g.prototype.init = function () {
            this.isActive = !1, this.getElement().find('[type="button"]').on("click", {control: this}, function (e) {
                var a = e.data.control;
                a.isActive = !0, a._option.click.call(this, {control: a, parent: lg.Cache.Views[a._option.parentName]})
            })
        }, g
    }), lg.Views = lg.Views || {}, lg.Views.BaseView = function (a) {
        this._name = "", this._children = [], this._Validation = {}, this._options = {}, this.childrenData = {}, this.field = {}, a && (this._name = a.name), $.extend(this._options, a), this._element = "string" == typeof a.name ? $('[data-view="' + this._name + '"]') : this._name, lg.Cache.Views[this._name] = this, this.init()
    }, lg.Views.BaseView.prototype.getElement = function () {
        return this._element
    }, lg.Views.BaseView.prototype.setClear = function () {
        for (var a in this.field) this.field[a].setClear()
    }, lg.Views.BaseView.prototype.ValidatForm = function () {
        for (var a in this.field) {
            var i = {};
            this.field[a].getIsValueField() && (this.field[a]._isDirty = !0, i = this.field[a].getIsValid(this.field[a].getValue())), lg.Utils.isNullObject(i) ? this._Validation[a] = i : delete this._Validation[a]
        }
        if (lg.Utils.isNullObject(this._Validation)) {
            for (var a in this._Validation) this.field[a].setValidMessage(this._Validation[a], "CollectData");
            return !1
        }
        return !0
    }, lg.Views.BaseView.prototype.CollectData = function (a) {
        this.childrenData.isValidate = !0, a || (this.childrenData.isValidate = this.ValidatForm());
        for (var g in this.field) this.field[g].getIsValueField() && (this.childrenData[g] = this.field[g] ? this.field[g].getValue() : "");
        return this.childrenData
    }, lg.Views.BaseView.prototype.init = function () {
        this._options, this._options.fields ? this.initControls(this._options.fields) : ""
    }, lg.Views.BaseView.prototype.initControls = function (a) {
        for (var i = 0, g = a.length; g > i; i++) a[i].parentName = this._name, this.field[a[i].name] = new lg.Widgets.Controls[a[i].controlType](a[i]), this.field[a[i].name].BaseInit()
    }, lg.Views.BaseView.prototype.extend = function (a, g) {
        this[a] = g
    }, lg.Models = lg.Models || {}, lg.Models.BaseViewModel = function (a, g) {
        a && (this._name = a), this._name = "", $.extend(this._options, g)
    }, module.exports = {lg: lg}
});
/*!account-c/modules/setting/main.js*/
;define("account-c/modules/setting/main", ["require", "exports", "module", "dep/jquery-colorbox/jquery.colorbox", "common/components/jquery-validate/jquery-validate", "dep/blueimp-md5/js/md5", "common/widgets/lagou-ui/lagou", "common/widgets/country-code/main"], function (require, exports, module) {
    function a() {
        return "placeholder" in document.createElement("input")
    }

    function c() {
        a() || $("[placeholder]").focus(function () {
            var a = $(this);
            a.val() == a.attr("placeholder") ? (a.val(""), a.removeClass("placeholder"), a.css("color", "#333")) : a.css("color", "#333")
        }).blur(function () {
            var a = $(this);
            ("" == a.val() || a.val() == a.attr("placeholder")) && (a.addClass("placeholder"), a.val(a.attr("placeholder")), a.css("color", "#999"))
        }).blur(), "" === $("[placeholder]").value && ($("[placeholder]").value = $("[placeholder]").attr("placeholder"))
    }

    function h() {
        $.colorbox.close(), parent.jQuery.colorbox.close()
    }

    function g(e) {
        var a = e, c = a.parent.CollectData();
        c.countryCode = $('[data-view="phonebinding"] .area_code').text(), c.isValidate && $.ajax({
            url: a.control._option.url,
            data: c,
            type: "post",
            dataType: "json",
            cache: !1
        }).done(function (h) {
            var g = {
                1: {message: "成功", linkFor: "phoneVerificationCode", level: "info"},
                201: {message: "请输入手机号码", linkFor: "phone", level: "error"},
                202: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "error"},
                203: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "error"},
                204: {message: "验证码不正确", linkFor: "phoneVerificationCode", level: "error"},
                205: {message: "短信验证码验证异常,请稍后重试", linkFor: "phoneVerificationCode", level: "error"},
                206: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "error"},
                207: {message: "用户不存在", linkFor: "phone", level: "error"},
                208: {message: "用户已经绑定了手机号，不能继续绑定", linkFor: "phone", level: "error"},
                209: {message: "该手机帐号已存在，请重新输入或直接登录", linkFor: "phone", level: "error"},
                210: {message: "当前已经绑定此手机，请重新输入", linkFor: "phone", level: "error"},
                211: {message: "用户绑定手机号异常", linkFor: "phoneVerificationCode", level: "error"},
                402: {message: "验证码不正确", linkFor: "phoneVerificationCode", level: "error"},
                10010: {message: "图形验证码不正确", linkFor: "request_form_verifyCode", level: "error"},
                10011: {message: "操作太频繁", linkFor: "phoneVerificationCode", level: "info"},
                10012: {message: "永久封禁", linkFor: "phoneVerificationCode", level: "info"}
            };
            1 == h.state ? ($.colorbox({
                inline: !0,
                href: $("#confirmbindPhone"),
                title: "帐号绑定",
                innerHeight: "220px",
                scrolling: !1,
                overlayClose: !1
            }), $("#confirmbindPhone").find("div[my-phone]").text("已成功绑定手机  " + c.phone), O.setClear()) : g[h.state] ? a.parent.field[g[h.state].linkFor].showMessage({message: g[h.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: h.message})
        })
    }

    function v() {
        $.colorbox.close(), parent.jQuery.colorbox.close()
    }

    function _(e) {
        var a = e, c = a.parent.CollectData();
        c.isValidate && (c.countryCode = $('[data-view="phonechange"] .area_code').text(), $.ajax({
            url: a.control._option.url,
            data: c,
            type: "post",
            dataType: "json",
            cache: !1
        }).done(function (h) {
            var g = {
                1: {message: "成功", linkFor: "phoneVerificationCode", level: "info"},
                201: {message: "请输入手机号码", linkFor: "phone", level: "info"},
                202: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "info"},
                203: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "info"},
                204: {message: "验证码不正确", linkFor: "phoneVerificationCode", level: "info"},
                205: {message: "短信验证码验证异常,请稍后重试", linkFor: "phoneVerificationCode", level: "info"},
                206: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "info"},
                207: {message: "用户不存在", linkFor: "phone", level: "info"},
                208: {message: "用户已经绑定了手机号，不能继续绑定", linkFor: "phone", level: "info"},
                209: {message: "该手机帐号已存在，请重新输入或直接登录", linkFor: "phone", level: "info"},
                210: {message: "当前已经绑定此手机，请重新输入", linkFor: "phone", level: "info"},
                211: {message: "用户修改绑定的该手机号异常", linkFor: "phoneVerificationCode", level: "info"},
                213: {message: "用户不存在", linkFor: "phone", level: "info"},
                401: {message: "手机验证码错误", linkFor: "phoneVerificationCode", level: "error"},
                402: {message: "手机验证码错误", linkFor: "phoneVerificationCode", level: "error"},
                10010: {message: "图形验证码不正确", linkFor: "request_form_verifyCode", level: "error"},
                10011: {message: "操作太频繁", linkFor: "phoneVerificationCode", level: "info"},
                10012: {message: "永久封禁", linkFor: "phoneVerificationCode", level: "info"}
            };
            g[h.state] && 1 != h.state ? a.parent.field[g[h.state].linkFor].showMessage({message: g[h.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: h.message}), (1 == h.state || 304 == h.state) && ($.colorbox({
                inline: !0,
                href: $("#confirmbindPhone"),
                title: "帐号绑定",
                innerHeight: "220px",
                scrolling: !1,
                overlayClose: !1
            }), $("#confirmbindPhone").find("div[my-phone]").text("已更换绑定手机  " + (86 == c.countryCode ? "" : c.countryCode) + c.phone), $("#confirmbindPhone").find("div[my-phone]").attr("data-myurl", h.content.data.url), U.setClear())
        }))
    }

    function F() {
        var a, c = $("#newpassword").val(), h = $("#comfirmpassword").val();
        c = w(c), c = w(R + c + R), h = w(h), h = w(R + h + R);
        var g = {newPassword: c, newPassword2: h};
        N[0] && (a = w(N.val()), a = w(R + a + R), g.oldPassword = a), $.ajax({
            url: GLOBAL_DOMAIN.actx + "/account/updatePwd.json",
            type: "POST",
            data: g,
            dataType: "json"
        }).done(function (a) {
            1 == a.state ? ($.colorbox({
                inline: !0,
                href: $("#updatePassword"),
                scrolling: !1,
                title: "修改密码成功"
            }), y(4, "updatePassword h4 span", GLOBAL_DOMAIN.actx + "/frontLogout.do")) : 203 == a.state ? $("#oldpassword").next(".error").text("密码不正确请重新输入").show() : 204 == a.state ? $("#updatePwd_beError").text("重复密码不一致").show() : 205 == a.state ? $("#updatePwd_beError").text("登录超时，请重新登录").show() : 500 == a.state ? $("#updatePwd_beError").text("网络异常，请刷新重试").show() : $("#updatePwd_beError").text(a.message).show()
        })
    }

    function y(a, c, h) {
        var g = setTimeout(function () {
            $("#" + c).html(a), y(a - 1, c, h)
        }, 1e3);
        0 == a && (clearTimeout(g), top.location.href = h)
    }

    function C(a) {
        return "AUTH_TYPE_EMAIL_PASSWORD" == a ? "邮箱" : "AUTH_TYPE_QQ_WEB" == a ? "QQ" : "AUTH_TYPE_WEIBO_WEB" == a ? "新浪微博" : "AUTH_TYPE_WEIXIN_UNIONID" == a ? "微信" : "AUTH_TYPE_BAIDU_WEB" == a ? "百度" : a
    }

    function b(e) {
        var a = e, c = a.parent.CollectData();
        c.isValidate && (c.oauthType = $("#oauthType").val(), c.token = $("#token").val(), c.accountType = "phone", c.idCode = $("#idCode").val(), c.countryCode = $('[data-view="phoneRegister"] .area_code').text(), $.ajax({
            url: a.control._option.url,
            data: c,
            type: "post",
            dataType: "json",
            cache: !1
        }).done(function (c) {
            var h = {
                1: {message: "成功", linkFor: "credential", level: "info"},
                210: {message: "参数错误", linkFor: "credential", level: "error"},
                226: {message: "输入号码与归属地不匹配", linkFor: "credential", level: "error"},
                230: {message: "请输入手机验证码", linkFor: "phoneVerificationCode", level: "error"},
                231: {message: "手机验证码不正确", linkFor: "phoneVerificationCode", level: "error"},
                232: {message: "手机验证码验证异常，请稍后重试", linkFor: "phoneVerificationCode", level: "error"},
                246: {message: "请输入手机号码", linkFor: "credential", level: "error"},
                401: {message: "该帐号已被注册，请重新输入或选择“已有帐号”进行绑定", linkFor: "credential", level: "error"},
                402: {message: "你已经绑定过主帐号，不可重复绑定", linkFor: "credential", level: "error"},
                403: {message: "系统错误", linkFor: "phoneVerificationCode", level: "error"},
                404: {message: "该页面已失效，请重新登录后操作", linkFor: "phoneVerificationCode", level: "error"},
                "-1": {message: "系统错误", linkFor: "credential", level: "error"},
                10010: {message: "图形验证码不正确", linkFor: "request_form_verifyCode", level: "error"},
                10011: {message: "操作过于频繁，请联系管理员", linkFor: "phoneVerificationCode", level: "error"},
                10012: {message: "操作过于频繁，请联系管理员", linkFor: "phoneVerificationCode", level: "error"}
            };
            if (1 == c.state) {
                var g = c.content.data.url;
                window.location.href = g
            } else h[c.state] ? a.parent.field[h[c.state].linkFor].showMessage({message: h[c.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), a.parent.field.request_form_verifyCode.getVerifyCode()
        }))
    }

    require("dep/jquery-colorbox/jquery.colorbox"), require("common/components/jquery-validate/jquery-validate");
    var w = require("dep/blueimp-md5/js/md5"), k = require("common/widgets/lagou-ui/lagou").lg, T = null;
    require("common/widgets/country-code/main");
    var V = "", A = !0, E = $("#leaveFlagType");
    if (V = E && "0" == E.val() ? "你还未完成绑定，确认要离开该页面吗？" : "内容还未保存，确认离开该页面吗？", window.onbeforeunload = function () {
            return A ? void 0 : V
        }, $("#bing_my_phone").length > 0) {
        var P = $("#bing_my_phone").text(), j = P.substr(0, 3), L = P.substr(7);
        $("#bing_my_phone").text(j + "****" + L)
    }
    var B = $("#oauthType").val(), D = C(B);
    $(".oauthTypeClass").html(D), $("#thirdBind_resend").click(function () {
        var a = $("#recordCode").val();
        $.ajax({
            data: {recordCode: a},
            type: "POST",
            url: window.location.protocol + "//account.lagou.com/account/resendBindActive.json"
        }).done(function (a) {
            1 == a.state ? $.colorbox({
                inline: !0,
                href: $("#resend_success"),
                scrolling: !1,
                title: "验证邮件发送成功"
            }) : alert(401 == a.state ? "该页面已失效，请重新登录后操作" : "重发出现异常")
        })
    }), $("#confirmLeave").click(function () {
        A = !1
    }), $(".user_firstMainContent").css({"padding-bottom": "10px"}), $("#user_selectAccount form").click(function () {
        var a = $(this), c = a.find("label");
        $("#user_selectAccount form").removeClass("user_accountform_active"), c.addClass("checked").parent("form").addClass("user_accountform_active"), c.addClass("checked").parent("form").siblings("form").children("label").removeClass("checked"), c.siblings("div").slideDown(300), a.siblings("form").children("div").slideUp(300), c.siblings('div:has("ul")').length > 0 ? $(".user_warn").hide() : $(".user_warn").show()
    }), c(), $(".register_radio li").click(function () {
        $(this).children("input").attr("checked", !0), $(this).siblings().children("input").removeAttr("checked"), $(this).addClass("current").append("<em></em>").siblings().removeClass("current").find("em").remove(), $("#user_regBindForm").validate().element($(this).find("input"))
    }), $("#user_LoginEmail,#user_hasLoginEmail,#user_hasLoginPassword,#user_LoginPassword").focus(function () {
        $("#noLagouAccount_beError").hide(), $("#hasLagouAccount_EmailBeError").hide(), $("#hasLagouAccount_beError").hide(), $("#hasNoAccount_beError").hide()
    });
    var M, R = "veenike", I = {
        1: {message: "验证码已发送，请查收短信", linkFor: "phoneVerificationCode", level: "info"},
        201: {message: "请输入手机号码", linkFor: "phone", level: "error"},
        203: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "error"},
        204: {message: "系统错误", linkFor: "phoneVerificationCode", level: "error"},
        205: {message: "输入号码与归属地不匹配", linkFor: "phone", level: "error"},
        206: {message: "系统错误", linkFor: "phoneVerificationCode", level: "error"},
        207: {message: "该手机获取验证码已达上限，请明天再试", linkFor: "phoneVerificationCode", level: "error"},
        208: {message: "验证码发送太过频繁，请稍后再试", linkFor: "phoneVerificationCode", level: "error"},
        209: {message: "该手机已被注册", linkFor: "phone", level: "error"},
        222: {message: "该手机号未注册", linkFor: "phone", level: "error"},
        304: {message: "用户未登录", linkFor: "phone", level: "error"},
        401: {message: "手机验证码错误", linkFor: "phoneVerificationCode", level: "error"},
        402: {message: "手机验证码错误", linkFor: "phoneVerificationCode", level: "error"},
        10010: {message: "图形验证码不正确", linkFor: "request_form_verifyCode", level: "error"},
        10011: {message: "操作过于频繁，请联系管理员", linkFor: "phoneVerificationCode", level: "error"},
        10012: {message: "操作过于频繁，请联系管理员", linkFor: "phoneVerificationCode", level: "error"}
    };
    $("#user_bindForm").validate({
        rules: {
            email: {required: !0, email: !0, maxlength: 100},
            password: {required: !0, rangelength: [6, 16]}
        },
        messages: {
            email: {required: "请输入登录邮箱地址", email: "请输入有效的邮箱地址，如：gogo@lagou.com", maxlength: "请输入100字以内的邮箱地址"},
            password: {required: "请输入密码", rangelength: "请输入6-16位密码，字母区分大小写"}
        },
        errorPlacement: function (a, c) {
            "radio" == c.attr("type") ? a.insertAfter($(c).parents("ul")).css("marginTop", "-20px") : "checkbox" == c.attr("type") ? (a.insertAfter($(c).parent()).css("clear", "left"), $("#user_saveRegAccount").css("margin-top", "20px")) : a.insertAfter(c)
        },
        submitHandler: function (a) {
            A = !0;
            var c = $("#user_hasLoginEmail").val();
            M = $("#user_hasLoginPassword").val(), M = w(M), M = w(R + M + R);
            var h = $("#oauthType").val(), g = $("#token").val(), v = $("#user_HasAccount").attr("value"),
                _ = $("#idCode").val();
            $(a).find(":submit").attr("disabled", !0), $.ajax({
                type: "post",
                data: {idCode: _, type: v, confirm: !1, email: c, password: M, token: g, oauthType: h},
                url: GLOBAL_DOMAIN.actx + "/account/bindOldEmail.json",
                dataType: "json",
                success: function (h) {
                    if (1 == h.state) window.location.href = h.content.data.url; else if (241 == h.state) $("#hasLagouAccount_beError").text("请输入常用邮箱地址").show(); else if (211 == h.state) $("#hasLagouAccount_beError").text("请输入100字以内的邮箱地址").show(); else if (221 == h.state) $("#hasLagouAccount_beError").text("请输入有效的邮箱地址，如：gogo@lagou.com").show(); else if (242 == h.state) $("#hasLagouAccount_beError").text("请输入密码").show(); else if (212 == h.state) $("#hasLagouAccount_beError").text("请输入6-16位密码，字母区分大小写").show(); else if (243 == h.state) $("#hasLagouAccount_beError").text("参数错误").show(); else if (401 == h.state) $("#hasLagouAccount_beError").text("你已经绑定过邮箱帐号，不可重复绑定").show(); else if (402 == h.state) $("#hasLagouAccount_beError").text("密码错误，请重新输入").show(); else if (403 == h.state) {
                        var g = h.content.data.authInfo, v = C(g.oauthType), _ = g.nikeName;
                        $("#accountLogout").hide(), $("#accountBindType").html("邮箱"), $("#user_hasBindAccount").html(c + "帐号已绑定到" + v + "@" + _ + "，无法继续绑定"), $("#user_loginCurrentAccount").html("登录" + c + "，进入“帐号设置”解除绑定"), $("#user_confirmBindTips").html("换个邮箱绑定"), $.colorbox({
                            inline: !0,
                            href: $("#bindTips"),
                            scrolling: !1,
                            title: "帐号绑定"
                        }), $("#user_confirmBindTips").on("click", function () {
                            A = !0, $.colorbox.close(), parent.jQuery.colorbox.close()
                        })
                    } else 404 == h.state ? $("#hasLagouAccount_EmailBeError").html("该帐号未注册").show() : 405 == h.state ? ($("#accountLogout").hide(), $("#accountBindType").html("邮箱"), $("#user_hasBindAccount").html(c + "帐号已在拉勾网生成信息，继续绑定会发生信息冲突"), $("#user_loginCurrentAccount").html("登录" + c + "，进入“帐号设置”解除绑定"), $("#user_confirmBindTips").html("换个邮箱绑定"), $.colorbox({
                        inline: !0,
                        href: $("#bindTips"),
                        scrolling: !1,
                        title: "帐号绑定"
                    }), $("#user_confirmBindTips").on("click", function () {
                        A = !0, $.colorbox.close(), parent.jQuery.colorbox.close()
                    })) : 406 == h.state ? $("#hasLagouAccount_beError").html("该页面已失效，请重新登录后操作").show() : $("#hasLagouAccount_beError").text("绑定失败").show();
                    $(a).find(":submit").attr("disabled", !1)
                },
                error: function () {
                    $(a).find(":submit").attr("disabled", !1)
                }
            })
        }
    }), $(".user_backReplace").on("click", function () {
        $.colorbox({inline: !0, href: $("#bindReplace"), scrolling: !1, title: "帐号绑定"})
    }), $("#user_regBindForm").validate({
        rules: {
            type: {required: !0},
            email: {required: !0, email: !0, maxlength: 100},
            password: {required: !0, rangelength: [6, 16]},
            checkbox: {required: !0}
        },
        messages: {
            type: {required: "请选择使用拉勾的目的"},
            email: {required: "请输入常用邮箱地址", email: "请输入有效的邮箱地址，如：gogo@lagou.com", maxlength: "请输入100字以内的邮箱地址"},
            password: {required: "请输入密码", rangelength: "请输入6-16位密码，字母区分大小写"},
            checkbox: {required: "请接受拉勾用户协议"}
        },
        errorPlacement: function (a, c) {
            "radio" == c.attr("type") ? (a.insertAfter($(c).parents("ul")).css("marginTop", "-20px"), a.css("marginTop", "0px"), $(".user_registerRadio").css({
                "margin-top": "-5px",
                "margin-bottom": "5px;"
            }), $(".agreeNotice").css("margin-top", "14px")) : "checkbox" == c.attr("type") ? (a.insertAfter($(c).parent()).css("clear", "left"), $("#user_saveRegAccount").css("margin-top", "20px")) : a.insertAfter(c)
        },
        submitHandler: function (a) {
            var c = "", h = $("#user_LoginEmail").val(), g = $("#user_LoginPassword").val();
            g = w(g), g = w(R + g + R);
            var v = $("#oauthType").val(), _ = $("#token").val(), F = $("#user_NoAccount").attr("value"),
                y = $("#showCheckBox").val();
            c = "true" == y ? $(".register_radio li.current input").val() : $("#userType").val(), $(a).find(":submit").attr("disabled", !0), $.ajax({
                type: "post",
                data: {type: F, userType: c, email: h, password: g, token: _, oauthType: v},
                url: GLOBAL_DOMAIN.actx + "/account/bindNewEmail.json",
                dataType: "json",
                success: function (c) {
                    1 == c.state ? window.location.href = c.content.data.url : 241 == c.state ? $("#noLagouAccount_beError").text("请输入常用邮箱地址").show() : 211 == c.state ? $("#noLagouAccount_beError").text("请输入100字以内的邮箱地址").show() : 221 == c.state ? $("#noLagouAccount_beError").text("请输入有效的邮箱地址，如：gogo@lagou.com").show() : 242 == c.state ? $("#noLagouAccount_beError").text("请输入密码").show() : 212 == c.state ? $("#noLagouAccount_beError").text("请输入6-16位密码，字母区分大小写").show() : 243 == c.state ? $("#noLagouAccount_beError").text("请选择使用拉勾的目的").show() : 244 == c.state ? $("#hasLagouAccount_beError").text("参数错误").show() : 401 == c.state ? $("#noLagouAccount_beError").text("该邮箱已被注册，请重新输入或选择“已有帐号”进行绑定").show() : 402 == c.state ? $("#noLagouAccount_beError").text("你已经绑定过邮箱帐号，不可重复绑定").show() : 403 == c.state ? $("#noLagouAccount_beError").text("注册邮箱用户失败").show() : 404 == c.state ? $("#noLagouAccount_beError").text("该页面已失效，请重新登录后操作").show() : $("#noLagouAccount_beError").text("绑定失败").show(), $(a).find(":submit").attr("disabled", !1)
                },
                error: function () {
                    $(a).find(":submit").attr("disabled", !1)
                }
            })
        }
    }), $("#bindindPhoneBtn").click(function (e, a) {
        O.setClear(), $.colorbox({
            inline: !0,
            href: $("#bindPhone"),
            title: a ? a : "帐号绑定",
            innerHeight: "404px",
            overlayClose: !1,
            scrolling: !1,
            onClosed: function () {
                O.setClear(), clearInterval(T);
                var a = $('[data-view="phonebinding"]');
                a.find(".verify_tips_main").hide(), a.find(".auto_phone").removeProp("disabled"), a.find(".verify_tips_count_down").hide()
            }
        })
    }), $("#changeEmailBtn").click(function () {
        $.colorbox({
            inline: !0,
            href: $("#bindEmail"),
            title: "帐号绑定",
            innerHeight: "230px",
            scrolling: !1,
            overlayClose: !1
        })
    }), $("#changePhoneBtn").click(function () {
        U.setClear(), $.colorbox({
            inline: !0,
            href: $("#changePhone"),
            title: "帐号绑定",
            innerHeight: "418px",
            overlayClose: !1,
            scrolling: !1,
            onClosed: function () {
                U.setClear(), clearInterval(T);
                var a = $('[data-view="phonechange"]');
                a.find(".verify_tips_main").hide(), a.find(".auto_phone").removeProp("disabled"), a.find(".verify_tips_count_down").hide()
            }
        })
    });
    var O = new k.Views.BaseView({
        name: "phonebinding",
        fields: [{
            name: "phone",
            validRules: [{mode: "require", data: "", message: "请输入手机号码", trigger: "blur"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: {phone: /^\d{5,11}$/},
                message: "输入号码与归属地不匹配"
            }],
            controlType: "Phone"
        }, {
            name: "phoneVerificationCode",
            linkFor: "phone",
            totalTips: "该手机获取验证码已达上限，请明天再试",
            validRules: [{mode: "require", data: "", message: "请输入6位数字验证码"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: "/^[0-9]{6,6}$/",
                message: "请输入6位数字验证码"
            }],
            url: "/account/sendBindPhoneVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="phonebinding"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 0,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    if (I[c.state] ? a.parent.field[I[c.state].linkFor].showMessage({message: I[c.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), 1 == c.state) {
                        var h = $('[data-view="phonebinding"]'),
                            g = h.find('[data-propertyname="phoneVerificationCode"]');
                        h.find(".verify_tips_main").hide(), e.control.starttime(e.control, function () {
                            h.find(".auto_phone").val("语音验证"), h.find(".verify_tips_main").show(), g.find(".first_child").removeClass("input_warning"), g.children(".input_tips").remove()
                        })
                    } else e.control.init(), a.parent.field.request_form_verifyCode.getVerifyCode();
                    e.control.setDisable(!1)
                })
            }
        }, {
            name: "autoPhoneVerificationCode",
            linkFor: "phone",
            totalTips: "该手机获取验证码已达上限，请明天再试",
            validRules: [],
            url: "/account/sendBindPhoneVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="phonebinding"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 1,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    var h, g = I[c.state], v = a.control.getTopTime(), _ = $('[data-view="phonebinding"]');
                    1 === c.state ? (h = _.find('[data-propertyname="phoneVerificationCode"]'), h.find(".last_child").addClass("btn_disabled").prop("disabled", !0), _.find(".auto_phone").prop("disabled", !0), clearInterval(T), T = setInterval(function () {
                        --v < 0 ? (clearInterval(T), h.find(".first_child").removeClass("input_warning"), h.find(".last_child").removeClass("btn_disabled").removeProp("disabled"), _.find(".auto_phone").removeProp("disabled"), _.find(".verify_tips_count_down").hide(), _.find(".verify_tips_main").show(), e.control.init()) : (v === a.control.getTopTime() - 1 && _.find(".verify_tips_main").hide(), _.find(".verify_tips_count_down").html("请留意接收手机来电，" + v + "秒后可重试…").show())
                    }, 1e3)) : (g ? a.parent.field[g.linkFor].showMessage({message: g.message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), e.control.init(), a.parent.field.request_form_verifyCode.getVerifyCode()), e.control.setDisable(!1)
                })
            }
        }, {
            name: "request_form_verifyCode",
            validRules: [{mode: "require", data: "", message: "请输入验证码"}, {
                mode: "pattern",
                data: "/^[a-zA-Z0-9一-龥]{4,4}$/",
                message: "请输入正确的验证码"
            }],
            from: "register",
            url: window.location.protocol + "//account.lagou.com/vcode/create",
            controlType: "VerifyCode"
        }, {
            name: "submit",
            validRules: [],
            controlType: "Button",
            url: "/account/bindPhone.json",
            click: g
        }, {name: "concel", validRules: [], controlType: "Button", url: "/register/register.json", click: h}]
    });
    O.field.request_form_verifyCode.getVerifyCode();
    var U = new k.Views.BaseView({
        name: "phonechange",
        fields: [{
            name: "phone",
            validRules: [{mode: "require", data: "", message: "请输入手机号码", trigger: "blur"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: {phone: /^\d{5,11}$/},
                message: "输入号码与归属地不匹配"
            }],
            controlType: "Phone"
        }, {
            name: "phoneVerificationCode",
            linkFor: "phone",
            totalTips: "该手机获取验证码已达上限，请明天再试",
            validRules: [{mode: "require", data: "", message: "请输入6位数字验证码"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: "/^[0-9]{6,6}$/",
                message: "请输入6位数字验证码"
            }],
            url: "/account/sendChangePhoneVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="phonechange"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 0,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    if (I[c.state] ? a.parent.field[I[c.state].linkFor].showMessage({message: I[c.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), 1 == c.state) {
                        var h = $('[data-view="phonechange"]'),
                            g = h.find('[data-propertyname="phoneVerificationCode"]');
                        h.find(".verify_tips_main").hide(), e.control.starttime(e.control, function () {
                            h.find(".auto_phone").val("语音验证"), h.find(".verify_tips_main").show(), g.find(".first_child").removeClass("input_warning"), g.children(".input_tips").remove()
                        })
                    } else a.parent.field.request_form_verifyCode.getVerifyCode(), e.control.init();
                    e.control.setDisable(!1)
                })
            }
        }, {
            name: "autoPhoneVerificationCode",
            linkFor: "phone",
            totalTips: "该手机获取验证码已达上限，请明天再试",
            validRules: [],
            url: "/account/sendChangePhoneVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="phonechange"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 1,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    var h, g = I[c.state], v = a.control.getTopTime(), _ = $('[data-view="phonechange"]');
                    1 === c.state ? (h = _.find('[data-propertyname="phoneVerificationCode"]'), h.find(".last_child").addClass("btn_disabled").prop("disabled", !0), _.find(".auto_phone").prop("disabled", !0), clearInterval(T), T = setInterval(function () {
                        --v < 0 ? (clearInterval(T), h.find(".first_child").removeClass("input_warning"), h.find(".last_child").removeClass("btn_disabled").removeProp("disabled"), _.find(".auto_phone").removeProp("disabled"), _.find(".verify_tips_count_down").hide(), _.find(".verify_tips_main").show(), e.control.init()) : (v === a.control.getTopTime() - 1 && _.find(".verify_tips_main").hide(), _.find(".verify_tips_count_down").html("请留意接收手机来电，" + v + "秒后可重试…").show())
                    }, 1e3)) : (g ? a.parent.field[g.linkFor].showMessage({message: g.message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), e.control.init(), a.parent.field.request_form_verifyCode.getVerifyCode()), e.control.setDisable(!1)
                })
            }
        }, {
            name: "request_form_verifyCode",
            validRules: [{mode: "require", data: "", message: "请输入验证码"}, {
                mode: "pattern",
                data: "/^[a-zA-Z0-9一-龥]{4,4}$/",
                message: "请输入正确的验证码"
            }],
            from: "register",
            url: window.location.protocol + "//account.lagou.com/vcode/create",
            controlType: "VerifyCode"
        }, {
            name: "submit",
            validRules: [],
            controlType: "Button",
            url: "/account/changePhone.json",
            click: _
        }, {name: "concel", validRules: [], controlType: "Button", url: "/register/register.json", click: v}]
    });
    $("#cancelEmail").click(function () {
        $("#userPhone").val() ? $.colorbox({
            inline: !0,
            href: $("#confirmUnbindEmail"),
            scrolling: !1,
            title: "帐号绑定"
        }) : $("#bindindPhoneBtn").trigger("click", "先绑定手机号，才能解绑邮箱")
    }), $("#cancelQQ").click(function () {
        $.colorbox({inline: !0, href: $("#confirmUnbindQQ"), scrolling: !1, title: "帐号绑定"})
    }), $("#cancleSina").click(function () {
        $.colorbox({inline: !0, href: $("#confirmUnbindSina"), scrolling: !1, title: "帐号绑定"})
    }), $("#cancleWeixin").click(function () {
        $.colorbox({inline: !0, href: $("#confirmUnbindWeixin"), title: "帐号绑定", scrolling: !1, innerWidth: "500px"})
    }), $("#cancleBaidu").click(function () {
        $.colorbox({inline: !0, href: $("#confirmUnbindBaidu"), title: "帐号绑定"})
    }), $("#user_confirmUnbindQQ").click(function () {
        window.location.href = GLOBAL_DOMAIN.actx + "/account/unbindOAuthAccount.html?oauthType=AUTH_TYPE_QQ_WEB"
    }), $("#user_confirmUnbindEmail").click(function () {
        $.ajax({
            url: "/account/unBindEmail.json", data: {email: $("#userEmail").val()}, success: function (a) {
                var c = {
                    201: "解绑邮箱为空",
                    202: "解绑邮箱过长",
                    203: "解绑邮箱格式无效",
                    204: "解绑邮箱错误",
                    205: "该用户不存在",
                    206: "需先绑定手机号",
                    207: "未绑定该邮箱，无需解绑",
                    208: "解绑邮箱异常",
                    304: "用户未登录"
                };
                1 == parseInt(a.state) ? location.reload() : 206 == parseInt(a.state) ? $("#bindindPhoneBtn").trigger("click", "先绑定手机号，才能解绑邮箱") : alert(c[a.state] ? c[a.state] : a.message)
            }, error: function () {
                alert("解绑邮箱遇到错误，请检查网络连接或联系网站管理员")
            }
        })
    }), $("#user_confirmUnbindSina").click(function () {
        window.location.href = GLOBAL_DOMAIN.actx + "/account/unbindOAuthAccount.html?oauthType=AUTH_TYPE_WEIBO_WEB"
    }), $("#user_confirmUnbindWeixin").click(function () {
        window.location.href = GLOBAL_DOMAIN.actx + "/account/unbindOAuthAccount.html?oauthType=AUTH_TYPE_WEIXIN_UNIONID"
    }), $("#user_confirmUnbindBaidu").click(function () {
        window.location.href = GLOBAL_DOMAIN.actx + "/account/unbindOAuthAccount.html?oauthType=AUTH_TYPE_BAIDU_WEB"
    }), $("#confirmUnbindEmail .cancel,#confirmUnbindQQ .cancel,#confirmUnbindSina .cancel,#confirmUnbindWeixin .cancel, #confirm_unbindService .cancel,#confirmbindPhone .cancel,#confirmbindEmail .cancel").click(function () {
        $("#confirmbindPhone").find("div[my-phone]").attr("data-myurl") ? (window.location.href = $("#confirmbindPhone").find("div[my-phone]").attr("data-myurl"), $.colorbox.close(), parent.jQuery.colorbox.close()) : ($.colorbox.close(), parent.jQuery.colorbox.close(), window.location.reload())
    }), $("#bindTips .btn,#bindTips .cancel").bind("click", function () {
        $.colorbox.close(), parent.jQuery.colorbox.close()
    }), $("#bindReplace .cancel").bind("click", function () {
        $("#chooseRemainError").html("请选择需要保留的帐号").hide(), $.colorbox.close(), parent.jQuery.colorbox.close()
    });
    var N = $("#oldpassword"), Q = {
        rules: {
            newpassword: {required: !0, rangelength: [6, 16]},
            comfirmpassword: {required: !0, equalTo: "#newpassword"}
        },
        messages: {
            newpassword: {required: "请输入新密码", rangelength: "请输入6-16位密码，字母区分大小写"},
            comfirmpassword: {required: "请再次输入新密码", equalTo: "两次输入的密码不一致，请重新输入"}
        },
        submitHandler: F
    };
    N[0] && (N.focus(function () {
        $("#updatePwd_beError").hide()
    }), Q = {
        rules: {
            oldpassword: {required: !0, rangelength: [6, 16]},
            newpassword: {required: !0, rangelength: [6, 16]},
            comfirmpassword: {required: !0, equalTo: "#newpassword"}
        },
        messages: {
            oldpassword: {required: "请输入当前密码", rangelength: "请输入6-16位密码，字母区分大小写"},
            newpassword: {required: "请输入新密码", rangelength: "请输入6-16位密码，字母区分大小写"},
            comfirmpassword: {required: "请再次输入新密码", equalTo: "两次输入的密码不一致，请重新输入"}
        },
        submitHandler: F
    }), $("#updatePswForm").validate(Q), $(".user_confirmDel").click(function () {
        $.colorbox({inline: !0, href: $("#confirm_unbindService"), scrolling: !1, title: "解除招聘服务"})
    }), $("#confirm_unbind").click(function () {
        $.ajax({
            url: GLOBAL_DOMAIN.actx + "/user/closeService.json",
            type: "POST",
            dataType: "json"
        }).done(function (a) {
            a.success ? ($.colorbox({
                inline: !0,
                href: $("#unbindService"),
                scrolling: !1,
                title: "解除招聘服务"
            }), y(4, "unbindService h4 span", GLOBAL_DOMAIN.actx + "/corpCenter/bindStep1.html")) : alert(a.msg)
        })
    }), $("#resend_success .btn_s").click(function () {
        $.colorbox.close()
    });
    var H = new k.Views.BaseView({
        name: "phoneRegister",
        fields: [{
            name: "credential",
            validRules: [{mode: "require", data: "", message: "请输入手机号码", trigger: "blur"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: {phone: /^\d{5,11}$/},
                message: "输入号码与归属地不匹配"
            }],
            controlType: "Phone"
        }, {
            name: "phoneVerificationCode",
            linkFor: "credential",
            verifyCode: "request_form_verifyCode",
            totalTips: "该手机获取验证码已达上限，请明天再试",
            validRules: [{mode: "require", data: "", message: "请输入6位数字验证码"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: "/^[0-9]{6,6}$/",
                message: "请输入6位数字验证码"
            }],
            url: "/account/sendOauthBindNewMainAccountVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="phoneRegister"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 0,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    if (I[201].linkFor = I[203].linkFor = I[205].linkFor = I[207].linkFor = I[209].linkFor = I[222].linkFor = I[304].linkFor = "credential", I[c.state] ? a.parent.field[I[c.state].linkFor].showMessage({message: I[c.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), 1 == c.state) {
                        var h = $('[data-view="phoneRegister"]'),
                            g = h.find('[data-propertyname="phoneVerificationCode"]');
                        h.find(".verify_tips_main").hide(), e.control.starttime(e.control, function () {
                            h.find(".verify_tips_main").show(), g.find(".first_child").removeClass("input_warning"), g.children(".input_tips").remove()
                        })
                    } else e.control.init(), a.parent.field.request_form_verifyCode.getVerifyCode();
                    e.control.setDisable(!1)
                })
            }
        }, {
            name: "autoPhoneVerificationCode",
            linkFor: "credential",
            verifyCode: "request_form_verifyCode",
            validRules: [],
            url: "/account/sendOauthBindMainAccountVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="phoneRegister"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 1,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    I[201].linkFor = I[203].linkFor = I[205].linkFor = I[207].linkFor = I[209].linkFor = I[222].linkFor = I[304].linkFor = "credential";
                    var h, g = I[c.state], v = null, _ = a.control.getTopTime(), F = $('[data-view="phoneRegister"]');
                    1 === c.state ? (h = F.find('[data-propertyname="phoneVerificationCode"]'), h.find(".last_child").addClass("btn_disabled").prop("disabled", !0), clearInterval(v), v = setInterval(function () {
                        --_ < 0 ? (clearInterval(v), h.find(".first_child").removeClass("input_warning"), h.find(".last_child").removeClass("btn_disabled").removeProp("disabled"), F.find(".auto_phone").removeProp("disabled"), F.find(".verify_tips_count_down").hide(), F.find(".verify_tips_main").show(), e.control.init()) : (_ === a.control.getTopTime() - 1 && F.find(".verify_tips_main").hide(), F.find(".verify_tips_count_down").html("请留意接收手机来电，" + _ + "秒后可重试…").show())
                    }, 1e3)) : (g ? a.parent.field[I[c.state].linkFor].showMessage({message: I[c.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), e.control.init(), a.parent.field.request_form_verifyCode.getVerifyCode()), e.control.setDisable(!1)
                })
            }
        }, {
            name: "request_form_verifyCode",
            validRules: [{mode: "require", data: "", message: "请输入验证码"}, {
                mode: "pattern",
                data: "/^[a-zA-Z0-9一-龥]{4,4}$/",
                message: "请输入正确的验证码"
            }],
            from: "register",
            url: window.location.protocol + "//account.lagou.com/vcode/create",
            controlType: "VerifyCode"
        }, {name: "submit", validRules: [], controlType: "Button", url: "/account/bindNewMainAccount.json", click: b}]
    });
    H.field.request_form_verifyCode.getVerifyCode();
    {
        var S = new k.Views.BaseView({
            name: "passwordView",
            fields: [{
                name: "credential",
                validRules: [{mode: "require", data: "", message: "请输入已验证手机/邮箱", trigger: "blur"}, {
                    mode: "pattern",
                    isUse: !0,
                    status: !1,
                    data: {
                        phone: /^\d{5,15}$/,
                        email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
                    },
                    message: "请输入有效的手机/邮箱"
                }],
                controlType: "Phone"
            }, {
                name: "password",
                validRules: [{mode: "require", data: "", message: "请输入密码"}, {
                    mode: "pattern",
                    data: "/^[\\S\\s]{6,16}$/",
                    message: "请输入6-16位密码，字母区分大小写"
                }],
                controlType: "Password"
            }, {
                name: "request_form_verifyCode",
                isVisible: !1,
                validRules: [{mode: "require", data: "", message: "请输入验证码"}, {
                    mode: "pattern",
                    data: "/^[a-zA-Z0-9一-龥]{4,4}$/",
                    message: "请输入正确的验证码"
                }],
                from: "register",
                url: window.location.protocol + "//account.lagou.com/vcode/create",
                controlType: "VerifyCode"
            }, {
                name: "submit",
                validRules: [],
                controlType: "Button",
                url: "/account/bindOldMainAccount.json",
                click: function (e) {
                    var a = e, c = a.parent.CollectData(), h = "veenike";
                    if (c.isValidate) {
                        c.oauthType = $("#oauthType").val(), c.token = $("#token").val();
                        var g = /^\d{5,15}$/;
                        c.accountType = g.test(c.credential) ? "phone" : "email", c.idCode = $("#idCode").val(), c.password = w(c.password), c.password = w(h + c.password + h), $.ajax({
                            url: a.control._option.url,
                            data: c,
                            type: "post",
                            dataType: "json",
                            cache: !1
                        }).done(function (c) {
                            var h = {
                                1: {message: "成功", linkFor: "credential", level: "info"},
                                210: {message: "参数错误", linkFor: "credential", level: "error"},
                                241: {message: "请输入已绑定手机/邮箱", linkFor: "credential", level: "error"},
                                211: {message: "请输入有效的手机/邮箱", linkFor: "credential", level: "error"},
                                221: {message: "请输入有效的手机/邮箱", linkFor: "credential", level: "error"},
                                246: {message: "请输入已绑定手机/邮箱", linkFor: "credential", level: "error"},
                                216: {message: "请输入有效的手机/邮箱", linkFor: "credential", level: "error"},
                                226: {message: "请输入有效的手机/邮箱", linkFor: "credential", level: "error"},
                                242: {message: "请输入密码", linkFor: "password", level: "error"},
                                212: {message: "请输入6-16位密码，字母区分大小写", linkFor: "password", level: "error"},
                                401: {message: "你已经绑定过主帐号，不可重复绑定", linkFor: "credential", level: "error"},
                                402: {message: "帐号和密码不匹配", linkFor: "password", level: "error"},
                                403: {message: "该主帐号已经绑定其他", linkFor: "credential", level: "error"},
                                404: {message: "该帐号未注册", linkFor: "credential", level: "error"},
                                406: {message: "该页面已失效，请重新登录后操作", linkFor: "credential", level: "error"},
                                10010: {message: "验证码不正确", linkFor: "request_form_verifyCode", level: "error"},
                                10011: {message: "操作过于频繁，请联系管理员", linkFor: "password", level: "error"},
                                10012: {message: "操作过于频繁，请联系管理员", linkFor: "password", level: "error"}
                            };
                            if (1 == c.state) {
                                var g = c.content.data.url;
                                window.location.href = g
                            } else {
                                if (403 == c.state) {
                                    var v = $("#oauthType").val(), _ = C(v), F = c.content.data.authInfo,
                                        _ = C(F.oauthType), y = F.nikeName;
                                    $("#accountLogout").hide(), $("#accountBindType").html("拉勾帐号"), $("#user_hasBindAccount").html(a.parent.field.credential.getValue() + "帐号已绑定到" + _ + "@" + y + "，无法继续绑定"), $("#user_loginCurrentAccount").html("登录" + a.parent.field.credential.getValue() + "，进入“帐号设置”解除绑定"), $("#user_confirmBindTips").html("换个拉勾帐号绑定"), $.colorbox({
                                        inline: !0,
                                        href: $("#bindTips"),
                                        scrolling: !1,
                                        title: "帐号绑定"
                                    }), $("#user_confirmBindTips").on("click", function () {
                                        A = !0, $.colorbox.close(), parent.jQuery.colorbox.close()
                                    })
                                } else h[c.state] ? a.parent.field[h[c.state].linkFor].showMessage({message: h[c.state].message}) : a.parent.field.password.showMessage({message: c.message});
                                10010 == c.state && a.parent.field.request_form_verifyCode.setVisible(), a.parent.field.request_form_verifyCode.getVerifyCode()
                            }
                        })
                    }
                }
            }]
        }), W = $("#isVisiable_request_form_verifyCode").val();
        $("#is_must_show_verify_code").val()
    }
    "true" == W && (S.field.request_form_verifyCode.getVerifyCode(), S.field.request_form_verifyCode.setVisible(!0));
    var z = new k.Views.BaseView({
        name: "codeLogin",
        fields: [{
            name: "credential",
            validRules: [{mode: "require", data: "", message: "请输入已验证手机", trigger: "blur"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: {phone: /^\d{5,11}$/},
                message: "请输入有效的手机"
            }],
            controlType: "Phone"
        }, {
            name: "request_form_verifyCode",
            validRules: [{mode: "require", data: "", message: "请输入验证码"}, {
                mode: "pattern",
                data: "/^[a-zA-Z0-9一-龥]{4,4}$/",
                message: "请输入正确的验证码"
            }],
            from: "register",
            url: window.location.protocol + "//account.lagou.com/vcode/create",
            controlType: "VerifyCode"
        }, {
            name: "phoneVerificationCode",
            linkFor: "credential",
            verifyCode: "request_form_verifyCode",
            totalTips: "该手机获取验证码已达上限，请明天再试",
            validRules: [{mode: "require", data: "", message: "请输入6位数字验证码"}, {
                mode: "pattern",
                isUse: !0,
                status: !1,
                data: "/^[0-9]{6,6}$/",
                message: "请输入6位数字验证码"
            }],
            url: "/account/sendOauthBindMainAccountVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="codeLogin"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 0,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    var h, g = $('[data-view="codeLogin"]');
                    I[201].linkFor = I[203].linkFor = I[205].linkFor = I[207].linkFor = I[209].linkFor = I[222].linkFor = I[304].linkFor = "credential", I[c.state] ? a.parent.field[I[c.state].linkFor].showMessage({message: I[c.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), 1 == c.state ? (h = g.find('[data-propertyname="phoneVerificationCode"]'), g.find(".verify_tips_main").hide(), e.control.starttime(e.control, function () {
                        g.find(".auto_phone").val("语音验证"), g.find(".verify_tips_main").show(), h.find(".first_child").removeClass("input_warning"), h.children(".input_tips").remove()
                    })) : (e.control.init(), a.parent.field.request_form_verifyCode.getVerifyCode()), e.control.setDisable(!1)
                })
            }
        }, {
            name: "autoPhoneVerificationCode",
            linkFor: "credential",
            verifyCode: "request_form_verifyCode",
            validRules: [],
            url: "/account/sendOauthBindMainAccountVerifyCode.json",
            controlType: "PhoneVerificationCode",
            click: function (e) {
                var a = e;
                (-1 == a.control.totalTimeTemp || a.control.totalTimeTemp == a.control.getTopTime()) && $.ajax({
                    url: a.control._option.url,
                    data: {
                        countryCode: $('[data-view="codeLogin"] .area_code').text(),
                        phone: a.linkFor.getValue(),
                        type: 1,
                        request_form_verifyCode: k.Cache.Views[a.control._option.parentName].field.request_form_verifyCode.getValue()
                    },
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    I[201].linkFor = I[203].linkFor = I[205].linkFor = I[207].linkFor = I[209].linkFor = I[222].linkFor = I[304].linkFor = "credential";
                    var h, g = I[c.state], v = null, _ = a.control.getTopTime(), F = $('[data-view="codeLogin"]');
                    1 === c.state ? (h = F.find('[data-propertyname="phoneVerificationCode"]'), h.find(".last_child").addClass("btn_disabled").prop("disabled", !0), clearInterval(v), v = setInterval(function () {
                        --_ < 0 ? (clearInterval(v), h.find(".first_child").removeClass("input_warning"), h.find(".last_child").removeClass("btn_disabled").removeProp("disabled"), F.find(".auto_phone").removeProp("disabled"), F.find(".verify_tips_count_down").hide(), F.find(".verify_tips_main").show(), e.control.init()) : (_ === a.control.getTopTime() - 1 && F.find(".verify_tips_main").hide(), F.find(".verify_tips_count_down").html("请留意接收手机来电，" + _ + "秒后可重试…").show())
                    }, 1e3)) : (g ? a.parent.field[g.linkFor].showMessage({message: g.message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message}), e.control.init(), a.parent.field.request_form_verifyCode.getVerifyCode()), e.control.setDisable(!1)
                })
            }
        }, {
            name: "submit",
            validRules: [],
            controlType: "Button",
            url: "/account/bindOldMainAccount.json",
            click: function (e) {
                var a = e, c = a.parent.CollectData();
                c.isValidate && (c.oauthType = $("#oauthType").val(), c.token = $("#token").val(), c.accountType = "phone", c.idCode = $("#idCode").val(), c.countryCode = $('[data-view="codeLogin"] .area_code').text(), $.ajax({
                    url: a.control._option.url,
                    data: c,
                    type: "post",
                    dataType: "json",
                    cache: !1
                }).done(function (c) {
                    var h = {
                        1: {message: "成功", linkFor: "credential", level: "info"},
                        246: {message: "请输入已绑定手机", linkFor: "credential", level: "error"},
                        216: {message: "输入号码与归属地不匹配", linkFor: "credential", level: "error"},
                        226: {message: "输入号码与归属地不匹配", linkFor: "credential", level: "error"},
                        401: {message: "手机验证码错误", linkFor: "phoneVerificationCode", level: "error"},
                        402: {message: "手机验证码错误", linkFor: "phoneVerificationCode", level: "error"},
                        403: {message: "该主帐号已经绑定其他", linkFor: "credential", level: "error"},
                        404: {message: "该帐号未注册", linkFor: "credential", level: "error"},
                        406: {message: "该页面已失效，请重新登录后操作", linkFor: "phoneVerificationCode", level: "error"},
                        10010: {message: "图形验证码不正确", linkFor: "request_form_verifyCode", level: "error"},
                        10011: {message: "操作过于频繁，请联系管理员", linkFor: "phoneVerificationCode", level: "error"},
                        10012: {message: "操作过于频繁，请联系管理员", linkFor: "phoneVerificationCode", level: "error"}
                    };
                    if (1 == c.state) {
                        var g = c.content.data.url;
                        return void(window.location.href = g)
                    }
                    if (403 == c.state) {
                        var v = $("#oauthType").val(), _ = C(v), F = c.content.data.authInfo, _ = C(F.oauthType),
                            y = F.nikeName;
                        $("#accountLogout").hide(), $("#accountBindType").html("拉勾帐号"), $("#user_hasBindAccount").html(a.parent.field.credential.getValue() + "帐号已绑定到" + _ + "@" + y + "，无法继续绑定"), $("#user_loginCurrentAccount").html("登录" + a.parent.field.credential.getValue() + "，进入“帐号设置”解除绑定"), $("#user_confirmBindTips").html("换个拉勾帐号绑定"), $.colorbox({
                            inline: !0,
                            href: $("#bindTips"),
                            scrolling: !1,
                            title: "帐号绑定"
                        }), $("#user_confirmBindTips").on("click", function () {
                            A = !0, $.colorbox.close(), parent.jQuery.colorbox.close()
                        })
                    } else h[c.state] ? a.parent.field[h[c.state].linkFor].showMessage({message: h[c.state].message}) : a.parent.field.phoneVerificationCode.showMessage({message: c.message});
                    a.parent.field.request_form_verifyCode.getVerifyCode()
                }))
            }
        }]
    }), G = $("#user_bindForm .userbox"), Y = $(".tab_active");
    $("#user_bindForm .form_head").on("click", "li", function () {
        var a = $(this), c = G.eq(a.index());
        return c.is(":visible") || (a.addClass("active").siblings().removeClass("active"), Y.stop().animate({left: a.offsetParent().context.offsetLeft}, 400), c.show().siblings(".userbox").hide(), S.setClear(), z.setClear()), !1
    }), $("body").on("keyup", function (a) {
        13 == a.keyCode && ("block" == $("#user_hasLagouAccountForm").css("display") ? (S.field.submit.getElement().find("input").focus(), S.field.submit.getElement().find("input").trigger("click")) : "block" == $("#user_noLagouAccount").css("display") && "block" == $("#user_noLagouAccount").find('[data-view="phoneRegister"]').css("display") && (phoneRegister.field.submit.getElement().find("input").focus(), phoneRegister.field.submit.getElement().find("input").trigger("click")))
    }), module.exports = {phoneViewModel: H, getCredentialTypeName: C}
});
/*!account-c/modules/bindEmail/main.js*/
;define("account-c/modules/bindEmail/main", ["require", "exports", "module", "dep/jquery-placeholder/jquery-placeholder-2.3.0/jquery.placeholder", "dep/jquery-colorbox/jquery.colorbox", "common/components/jquery-checkbox/jquery.checkbox", "account-c/modules/setting/main"], function (require) {
    require("dep/jquery-placeholder/jquery-placeholder-2.3.0/jquery.placeholder"), require("dep/jquery-colorbox/jquery.colorbox"), require("common/components/jquery-checkbox/jquery.checkbox");
    require("account-c/modules/setting/main")
});
/*!account-c/modules/loading/main.js*/
;define("account-c/modules/loading/main", ["require", "exports", "module"], function () {
    var a = $("#loadingDiv");
    $(document).ajaxStart(function () {
        a.show()
    }).ajaxStop(function () {
        a.hide()
    })
});