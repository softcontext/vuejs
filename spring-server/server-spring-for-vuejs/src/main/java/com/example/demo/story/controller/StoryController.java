package com.example.demo.story.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.story.dto.Pager;
import com.example.demo.story.dto.Pagination;
import com.example.demo.story.model.Story;
import com.example.demo.story.repository.StoryRepository;
import com.example.demo.story.service.StoryService;

@RestController
@RequestMapping("/api")
public class StoryController {
	@Autowired
	private StoryRepository repo;
	@Autowired
	private StoryService service;
	
	/**
	 * HTTP Method : GET
	 * URL : your_company_domain/api/stories?page=1&size=10
	 * 요청 페이지 정보를 주고 해당 페이지의 데이터(다수의 Story)를 얻는다.
	 * 
	 * @param page : 데이터를 요청하는 페이지 번호. 1-base-index. 생략 가능.
	 * @param size : 한 페이지의 글의 개수(count of rows in one page). 생략 가능.
	 * @return : Pagination 객체를 JSON 포멧의 문자열로 변경하여 리턴한다.
	 */
	@GetMapping("/stories")
	public Object getStories(
			@RequestParam(name="page", required=false, defaultValue="1") int page,
			@RequestParam(name="size", required=false, defaultValue="10") int size){
		Pagination pagination = service.selectByLimit(page, size);
		return pagination;
	}
	
	/**
	 * HTTP Method : GET
	 * URL : your_company_domain/api/stories/:id
	 * 키 정보를 주고 해당 테이터(하나의 Story)를 얻는다.
	 * 
	 * @param id : 특정 스토리를 가리키는 유일한 키 값. 필수.
	 * @return : Story 객체를 JSON 포멧의 문자열로 변경하여 리턴한다.
	 */
	@GetMapping("/stories/{id}")
	public Object getStoryById(@PathVariable int id){
		Story story = repo.findOne(id);
		return story;
	}
	
	/**
	 * HTTP Method : POST
	 * URL : your_company_domain/api/stories
	 * 새 Story를 저장한다.
	 * 
	 * @param story : 클라이언트는 JSON 포맷의 문자열 데이터를 서버에 보낸다.
	 * 이 문자열을 스프링이 Story 객체에 저장하고 메소드의 파라미터로 전달한다.
	 * 이 때, 키 값 id 항목은 서버에서 디비 저장 시 정해지므로 전송 대상이 아니다.
	 * @return : 디비에 저장된 상태의 Story 객체를 JSON 포멧의 문자열로 변경하여 리턴한다.
	 */
	@PostMapping("/stories")
	public Object postStory(@RequestBody Story story){
		Story storyPersisted = repo.save(story);
		return storyPersisted;
	}
	
	/**
	 * HTTP Method : PATCH
	 * URL : your_company_domain/api/stories/:id
	 * 기존 Story를 수정한다.
	 * 
	 * @param story : 클라이언트는 JSON 포맷의 문자열 데이터를 서버에 보낸다.
	 * 이 문자열을 스프링이 Story 객체에 저장하고 메소드의 파라미터로 전달한다.
	 * @param id : 키 값 id 항목은 필수이며 디비에 저장 된 데이터를 구분하는 키 값이다.
	 * @return : 디비에 저장된 상태의 Story 객체를 JSON 포멧의 문자열로 변경하여 리턴한다.
	 */
	@PatchMapping("/stories/{id}")
	public Object patchStoryById(
			@RequestBody Story story,
			@PathVariable int id){
		story.setId(id);
		Story storyUpdated = repo.save(story);
		return storyUpdated;
	}
	
	/**
	 * HTTP Method : DELETE
	 * URL : your_company_domain/api/stories/:id
	 * 특정 Story를 삭제한다.
	 * 
	 * @param id : 키 값 id 항목은 필수이며 디비에 저장 된 데이터를 구분하는 키 값이다.
	 * @return : 삭제할 때 사용한 키 값 정보와 상태코드(200 OK)를 담은 객체를 
	 * JSON 포멧의 문자열로 변경하여 리턴한다.
	 */
	@DeleteMapping("/stories/{id}")
	public Object deleteStoryById(@PathVariable int id){
		repo.delete(id);
		Map<String, Integer> map = new HashMap<>();
		map.put("id", id);
		return new ResponseEntity<Map<String, Integer>>(map, HttpStatus.OK);
	}
	
	// --------------------------------------------------- extension service start
	/**
	 * Pagination 객체는 이전/다음 페이지 링크 정보를 클라이언트에게 제공한다.
	 * 클라이언트에서 세밀한 페이징처리를 원한다면 보다 많은 데이터를 제공하는
	 * Pagination 객체 대신 Pager 객체를 사용할 수 있다.
	 * 
	 * 과졔: 다음 URL과 연동하는 프론트엔드 프로그램을 작성하시오.
	 */
	private final String TARGET_OF_STORY = "/api/storiez";
	
	/**
	 * HTTP Method : GET
	 * URL : your_company_domain/api/storiez?page=1&size=10&bsize=5
	 * 요청 페이지 정보를 주고 해당 페이지의 데이터(다수의 Story)를 얻는다.
	 * 
	 * @param page : 데이터를 요청하는 페이지 번호. 1-base-index. 생략 가능.
	 * @param size : 한 페이지의 글의 개수(count of rows in one page). 생략 가능.
	 * @param bsize : 하단 페이징 영역에서 노출하는 페이징 번호 링크 개수. 생략 가능.
	 * @return : Pager 객체를 JSON 포멧의 문자열로 변경하여 리턴한다.
	 */
	@GetMapping("/storiez")
	public Object getStoriesForPager(
			@RequestParam(name="page", required=false, defaultValue="1") int page,
			@RequestParam(name="size", required=false, defaultValue="10") int size,
			@RequestParam(name="bsize", required=false, defaultValue="5") int bsize){
		Pager pager = service.selectByRange(page, size, bsize, TARGET_OF_STORY);
		return pager;
	}
	// --------------------------------------------------- extension service end
}
