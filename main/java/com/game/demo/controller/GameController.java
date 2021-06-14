package com.game.demo.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@SpringBootApplication
public class GameController {
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "index";
	}
	
	@RequestMapping(value = "/pikaballgame", method = RequestMethod.GET)
	public String openPikaBallGame() {
		return "pika";
	}
	
	@RequestMapping(value = "/spaceshipgame", method = RequestMethod.GET)
	public String openSpaceShipGame() {
		return "spaceship";
	}

}
