create database school;

-- Tables
create table roles (
    id serial primary key,
    description varchar(30) not null unique
);

create table users (
    id serial primary key,
    username varchar(15) not null unique,
    password varchar(60) not null,
    role_id int not null,
    names varchar(50) null,
    surnames varchar(50) null,
    dni varchar(8) null unique,
    birthdate date null,
    mail varchar(50) not null unique,
    phone varchar(20) null,
    address varchar(150) null,
    is_deleted boolean not null default false,
    constraint fk_users_role_id foreign key (role_id) references roles(id)
);

create table classtimes (
    id serial primary key,
    description varchar(30) not null unique
);

create table subjects (
    id serial primary key,
    description varchar(30) not null,
    classtime_id int null,
    constraint fk_subjects_classtime_id foreign key (classtime_id) references classtimes(id)
);

create table student_subject (
    student_id int not null,
    subject_id int not null,
    is_deleted boolean not null default false,
    constraint fk_student_subject_student_id foreign key (student_id) references users(id),
    constraint fk_student_subject_subject_id foreign key (subject_id) references subjects(id),
    unique (student_id, subject_id)
);

create table professor_subject (
    professor_id int not null,
    subject_id int not null,
    constraint fk_professor_subject_professor_id foreign key (professor_id) references users(id),
    constraint fk_professor_subject_subject_id foreign key (subject_id) references subjects(id),
    unique (professor_id, subject_id)
);

create table attendances (
    id serial primary key,
    student_id int not null,
    subject_id int not null,
    date date not null,
    status int not null,
	constraint fk_attendances_student_id foreign key (student_id) references users(id),
    constraint fk_attendances_subject_id foreign key (subject_id) references subjects(id),
    unique (student_id, subject_id, date)
);

create table tests (
    id serial primary key,
    description varchar(30) not null,
    date date not null,
    subject_id int not null,
    is_deleted boolean not null default false,
    constraint fk_tests_subject_id foreign key (subject_id) references subjects(id)
);

create table student_test (
    student_id int not null,
    test_id int not null,
    qualification int not null default 0,
    is_enabled boolean not null default false,
    constraint fk_student_test_student_id foreign key (student_id) references users(id),
    constraint fk_student_test_test_id foreign key (test_id) references tests(id),
    unique (student_id, test_id)
);
