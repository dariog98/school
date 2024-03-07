insert into roles (description) values
('Admin'), ('Teacher'), ('Student');

-- Admins
insert into users (username, password, surnames, names, mail, dni, birthdate, role_id) values
('admin', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', '', 'Admin', 'admin@mail.com', '12345678', '2000-01-01', 1);

-- Students
insert into users (username, password, surnames, names, mail, dni, birthdate, role_id) values
('sunpayus', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'García', 'Álvaro', 'sunpayus@mail.com', '12345671', '2000-01-01', 3),
('martinez', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Martinez', 'Antonio', 'martinez@mail.com', '12345672', '2000-01-01', 3),
('alex', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Masanet', 'Alejandro', 'alex@mail.com', '12345673', '2000-01-01', 3),
('mopoz', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Fernández-Quejo Cano', 'Alejandro', 'mopoz@mail.com', '12345674', '2000-01-01', 3),
('dav1g', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Granado Bermudo', 'David', 'dav1g@mail.com', '12345675', '2000-01-01', 3),
('garcia', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Garcia', 'Franco', 'garcia@mail.com', '12345676', '2000-01-01', 3),
('gonzamax', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Gonzalez', 'Maximiliano', 'gonzamax@mail.com', '12345677', '2000-01-01', 3),
('rigal', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Rigal', 'Santiago', 'rigal@mail.com', '12345679', '2000-01-01', 3),
('molina', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Molina', 'Martín', 'rox@mail.com', '44345679', '2000-01-01', 3),
('luken', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Nadotti', 'Luka', 'luken@mail.com', '41345679', '2000-01-01', 3);

-- Teachers
insert into users (username, password, surnames, names, mail, dni, birthdate, role_id) values
('pino', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Manarino', 'Rodrigo', 'pino@mail.com', '30125457', '2000-01-01', 2),
('zote', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Acosta', 'Julián', 'zote@mail.com', '32054457', '2000-01-01', 2),
('blade', '$2a$10$TyL9BXurfuePLz6cWcls1.2KsbVlt1n9SQCZRDn8kMszvZ5w6eERu', 'Barcena', 'Galder', 'galder@mail.com', '30255457', '2000-01-01', 2);

insert into student_subject (student_id, subject_id)
values
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1);

insert into professor_subject  (professor_id, subject_id)
values
(19, 1);

select * from roles;

select student_id, status, count(*) from attendances
where subject_id = 1
group by student_id, status;

select count(distinct date) as totalClass from attendances
where subject_id = 1;

select count(distinct date) as totalClass from attendances
where subject_id = 1;

INSERT INTO attendances (student_id, subject_id, date, status)
    VALUES
    (11, 1, '2024-03-01', 1),
    (12, 1, '2024-03-01', 1),
    (13, 1, '2024-03-01', 1),
    (14, 1, '2024-03-01', 2),
    (15, 1, '2024-03-01', 2),
    (16, 1, '2024-03-01', 2),
    (17, 1, '2024-03-01', 1),
    (18, 1, '2024-03-01', 1)
    AS new
ON DUPLICATE KEY UPDATE status = new.status;

select count(*) from attendances
where subject_id = 1 and date = '2024-03-01';

select date from attendances
where subject_id = 1
group by date;



