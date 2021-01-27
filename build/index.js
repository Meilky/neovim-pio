"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Menu_1 = require("./Classes/Menu");
var child_process_1 = __importDefault(require("child_process"));
var MainMenu = new Menu_1.CMenu("Main menu", [
    {
        name: "Upload and monitor",
        handler: function () {
            child_process_1.default.execSync("pio run", { stdio: "inherit" });
            MainMenu.render();
        },
    },
    {
        name: "exit",
        handler: function () {
            process.exit();
        },
    },
]);
MainMenu.render();
MainMenu.read();
