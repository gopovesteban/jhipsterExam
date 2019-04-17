package com.exam2.web.rest;

import com.exam2.JhipsterExamApp;

import com.exam2.domain.Sprint;
import com.exam2.repository.SprintRepository;
import com.exam2.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static com.exam2.web.rest.TestUtil.sameInstant;
import static com.exam2.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SprintResource REST controller.
 *
 * @see SprintResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterExamApp.class)
public class SprintResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSprintMockMvc;

    private Sprint sprint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SprintResource sprintResource = new SprintResource(sprintRepository);
        this.restSprintMockMvc = MockMvcBuilders.standaloneSetup(sprintResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sprint createEntity(EntityManager em) {
        Sprint sprint = new Sprint()
            .name(DEFAULT_NAME)
            .endDate(DEFAULT_END_DATE)
            .startDate(DEFAULT_START_DATE)
            .status(DEFAULT_STATUS);
        return sprint;
    }

    @Before
    public void initTest() {
        sprint = createEntity(em);
    }

    @Test
    @Transactional
    public void createSprint() throws Exception {
        int databaseSizeBeforeCreate = sprintRepository.findAll().size();

        // Create the Sprint
        restSprintMockMvc.perform(post("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sprint)))
            .andExpect(status().isCreated());

        // Validate the Sprint in the database
        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeCreate + 1);
        Sprint testSprint = sprintList.get(sprintList.size() - 1);
        assertThat(testSprint.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSprint.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testSprint.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testSprint.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createSprintWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sprintRepository.findAll().size();

        // Create the Sprint with an existing ID
        sprint.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSprintMockMvc.perform(post("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sprint)))
            .andExpect(status().isBadRequest());

        // Validate the Sprint in the database
        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sprintRepository.findAll().size();
        // set the field null
        sprint.setName(null);

        // Create the Sprint, which fails.

        restSprintMockMvc.perform(post("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sprint)))
            .andExpect(status().isBadRequest());

        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = sprintRepository.findAll().size();
        // set the field null
        sprint.setEndDate(null);

        // Create the Sprint, which fails.

        restSprintMockMvc.perform(post("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sprint)))
            .andExpect(status().isBadRequest());

        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = sprintRepository.findAll().size();
        // set the field null
        sprint.setStartDate(null);

        // Create the Sprint, which fails.

        restSprintMockMvc.perform(post("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sprint)))
            .andExpect(status().isBadRequest());

        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = sprintRepository.findAll().size();
        // set the field null
        sprint.setStatus(null);

        // Create the Sprint, which fails.

        restSprintMockMvc.perform(post("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sprint)))
            .andExpect(status().isBadRequest());

        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSprints() throws Exception {
        // Initialize the database
        sprintRepository.saveAndFlush(sprint);

        // Get all the sprintList
        restSprintMockMvc.perform(get("/api/sprints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sprint.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(sameInstant(DEFAULT_END_DATE))))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(sameInstant(DEFAULT_START_DATE))))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getSprint() throws Exception {
        // Initialize the database
        sprintRepository.saveAndFlush(sprint);

        // Get the sprint
        restSprintMockMvc.perform(get("/api/sprints/{id}", sprint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sprint.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.endDate").value(sameInstant(DEFAULT_END_DATE)))
            .andExpect(jsonPath("$.startDate").value(sameInstant(DEFAULT_START_DATE)))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSprint() throws Exception {
        // Get the sprint
        restSprintMockMvc.perform(get("/api/sprints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSprint() throws Exception {
        // Initialize the database
        sprintRepository.saveAndFlush(sprint);

        int databaseSizeBeforeUpdate = sprintRepository.findAll().size();

        // Update the sprint
        Sprint updatedSprint = sprintRepository.findById(sprint.getId()).get();
        // Disconnect from session so that the updates on updatedSprint are not directly saved in db
        em.detach(updatedSprint);
        updatedSprint
            .name(UPDATED_NAME)
            .endDate(UPDATED_END_DATE)
            .startDate(UPDATED_START_DATE)
            .status(UPDATED_STATUS);

        restSprintMockMvc.perform(put("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSprint)))
            .andExpect(status().isOk());

        // Validate the Sprint in the database
        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeUpdate);
        Sprint testSprint = sprintList.get(sprintList.size() - 1);
        assertThat(testSprint.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSprint.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testSprint.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testSprint.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSprint() throws Exception {
        int databaseSizeBeforeUpdate = sprintRepository.findAll().size();

        // Create the Sprint

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSprintMockMvc.perform(put("/api/sprints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sprint)))
            .andExpect(status().isBadRequest());

        // Validate the Sprint in the database
        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSprint() throws Exception {
        // Initialize the database
        sprintRepository.saveAndFlush(sprint);

        int databaseSizeBeforeDelete = sprintRepository.findAll().size();

        // Delete the sprint
        restSprintMockMvc.perform(delete("/api/sprints/{id}", sprint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sprint> sprintList = sprintRepository.findAll();
        assertThat(sprintList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sprint.class);
        Sprint sprint1 = new Sprint();
        sprint1.setId(1L);
        Sprint sprint2 = new Sprint();
        sprint2.setId(sprint1.getId());
        assertThat(sprint1).isEqualTo(sprint2);
        sprint2.setId(2L);
        assertThat(sprint1).isNotEqualTo(sprint2);
        sprint1.setId(null);
        assertThat(sprint1).isNotEqualTo(sprint2);
    }
}
