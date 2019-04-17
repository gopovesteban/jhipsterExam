package com.exam2.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "num_student", nullable = false)
    private Integer numStudent;

    @NotNull
    @Column(name = "schedule", nullable = false)
    private String schedule;

    @NotNull
    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private Period period;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Project name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNumStudent() {
        return numStudent;
    }

    public Project numStudent(Integer numStudent) {
        this.numStudent = numStudent;
        return this;
    }

    public void setNumStudent(Integer numStudent) {
        this.numStudent = numStudent;
    }

    public String getSchedule() {
        return schedule;
    }

    public Project schedule(String schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getStatus() {
        return status;
    }

    public Project status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Period getPeriod() {
        return period;
    }

    public Project period(Period period) {
        this.period = period;
        return this;
    }

    public void setPeriod(Period period) {
        this.period = period;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Project project = (Project) o;
        if (project.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), project.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", numStudent=" + getNumStudent() +
            ", schedule='" + getSchedule() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
