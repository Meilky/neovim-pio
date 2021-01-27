"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTable = void 0;
var CTable = /** @class */ (function () {
    function CTable(name, options) {
        /*
         * ┌───────────┐
         * │ Main menu │
         * ├───┬───────┤
         * │ 1 │ get   │
         * │ 2 │ set   │
         * │ 0 │ exit  │
         * └───┴───────┘
         */
        this.tableChars = {
            middleMiddle: "─",
            rowMiddle: "┼",
            topRight: "┐",
            topLeft: "┌",
            leftMiddle: "├",
            topMiddle: "┬",
            bottomRight: "┘",
            bottomLeft: "└",
            bottomMiddle: "┴",
            rightMiddle: "┤",
            left: "| ",
            right: " |",
            middle: " │ ",
        };
        this.renderedString = "";
        this.idColMaxWidth = 0;
        this.nameColMaxWidth = 0;
        this.width = 0;
        this.top = [];
        this.middle = [];
        this.bottom = [];
        this.name = name;
        this.options = options;
        this.calculate();
    }
    /*
     * Calculate everything for the table
     */
    CTable.prototype.calculate = function () {
        var _this = this;
        this.options.map(function (option, id) {
            var nameLength = option.name.length;
            var idLength = (id++).toString().length;
            if (_this.idColMaxWidth < idLength)
                _this.idColMaxWidth = idLength;
            if (_this.nameColMaxWidth < nameLength)
                _this.nameColMaxWidth = nameLength;
        });
        var titleLength = this.tableChars.left.length + this.tableChars.right.length + this.name.length;
        var rowLength = this.tableChars.left.length +
            this.tableChars.right.length +
            this.tableChars.middle.length +
            this.nameColMaxWidth +
            this.idColMaxWidth;
        if (titleLength >= rowLength)
            this.width = titleLength;
        else
            this.width = rowLength;
    };
    CTable.prototype.render = function () {
        var _this = this;
        if (this.renderedString)
            console.log(this.renderedString);
        else {
            this.renderTop();
            this.renderMiddle();
            this.renderBottom();
            this.top.map(function (t, id) {
                _this.renderedString += t.join("") + "\n";
            });
            this.middle.map(function (m, id) {
                _this.renderedString += m.join("") + "\n";
            });
            this.bottom.map(function (b, id) {
                _this.renderedString += b.join("") + "\n";
            });
            console.log(this.renderedString);
        }
    };
    CTable.prototype.renderMiddle = function () {
        var _this = this;
        this.options.map(function (option, id) {
            if (id + 1 === _this.options.length) {
                _this.middle[id] = [_this.tableChars.left, (0).toString()];
                for (var i = 0; i < _this.idColMaxWidth - (0).toString().length; i++) {
                    _this.middle[id].push(" ");
                }
            }
            else {
                _this.middle[id] = [_this.tableChars.left, (id + 1).toString()];
                for (var i = 0; i < _this.idColMaxWidth - (id + 1).toString().length; i++) {
                    _this.middle[id].push(" ");
                }
            }
            _this.middle[id].push(_this.tableChars.middle, option.name);
            for (var i = 0; i <=
                _this.width -
                    (_this.idColMaxWidth +
                        option.name.length +
                        _this.tableChars.middle.length +
                        _this.tableChars.left.length +
                        _this.tableChars.right.length); i++) {
                _this.middle[id].push(" ");
            }
            _this.middle[id].push(_this.tableChars.right);
        });
    };
    CTable.prototype.renderBottom = function () {
        this.bottom[0] = this.top[2];
        this.bottom[0] = this.bottom[0]
            .join("")
            .split(this.tableChars.leftMiddle)
            .join(this.tableChars.bottomLeft)
            .split("");
        this.bottom[0] = this.bottom[0]
            .join("")
            .split(this.tableChars.rightMiddle)
            .join(this.tableChars.bottomRight)
            .split("");
        this.bottom[0] = this.bottom[0]
            .join("")
            .split(this.tableChars.topMiddle)
            .join(this.tableChars.bottomMiddle)
            .split("");
    };
    CTable.prototype.renderTop = function () {
        this.top[0] = [this.tableChars.topLeft];
        this.top[1] = [this.tableChars.left, this.name];
        this.top[2] = [this.tableChars.leftMiddle];
        for (var i = 0; i <= this.width; i++) {
            if (i <=
                this.width - (this.tableChars.topLeft.length + this.tableChars.topRight.length)) {
                this.top[0].push(this.tableChars.middleMiddle);
            }
            if (i <=
                this.width -
                    (this.tableChars.left.length + this.tableChars.right.length + this.name.length)) {
                this.top[1].push(" ");
            }
            if (i < this.tableChars.left.length + this.idColMaxWidth) {
                this.top[2].push(this.tableChars.middleMiddle);
            }
            else if (i === this.tableChars.left.length + this.idColMaxWidth) {
                this.top[2].push(this.tableChars.topMiddle);
            }
            else if (i < this.width - 1) {
                this.top[2].push(this.tableChars.middleMiddle);
            }
        }
        this.top[0].push(this.tableChars.topRight);
        this.top[1].push(this.tableChars.right);
        this.top[2].push(this.tableChars.rightMiddle);
    };
    return CTable;
}());
exports.CTable = CTable;
