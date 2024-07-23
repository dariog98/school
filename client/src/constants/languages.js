import { ClassAttendances } from "../components/class";

export const LANGUAGES = {
    ES: {
        roles: {
            1: 'Administrador',
            2: 'Profesor',
            3: 'Alumno'
        },
        days: [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado' ],
    },
    EN: {
        titles: {
            Classes: 'Classes',
            NewClass: 'New Class'
        },
        rows: {
            Surnames: 'Surnames',
            Names: 'Names',
            Username: 'Username',
            Password: 'Password',
            ConfirmPassword: 'Confirm Password',
            Description: 'Description',
            DNI: 'DNI',
            Birthdate: 'Birthdate',
            Mail: 'Email'
        },
        buttons: {
            Add: 'Add',
            Edit: 'Edit',
            Delete: 'Delete',
            Save: 'Save',
            GoBack: 'Go back',
        },
        messages: {
            Welcome: 'Welcome',
            WelcomeStudent: 'Welcome, student!',
            NoResults: 'No results found',
            Loading: 'Loading...',
            LogIn: 'Login',
            LogOut: 'Logout',
            Register: 'Register',
            GetStarted: 'Get Started',
            Search: 'Search...',
            YearsOld: 'Years old',
            NotNullable: 'The field cannot be empty',
            FieldRequired: 'The field is required',
            FieldsDoNotMatch: 'Fields do not match',
            InvalidDate: 'The date entered is not valid',
            InvalidFormat: 'The format is not valid',
            PasswordMin: 'The password must have a minimum of 8 characters',
            WriteHere: 'Write here...',
            PasswordChanged: 'Password changed successfully',
            UserUpdated: 'Your profile has been updated successfully',
            UserNotFound: 'User not found',
            InvalidPassword: 'Invalid password',
            LoginSuccess: 'Login succesfully',
            ConfirmDelete: 'Do you confirm that you want to delete the following item?',
            DNIDuplicatedError: 'The DNI entered already exists',
            DescriptionDuplicatedError: 'The description entered already exists',
            DateTimeNotAvailable: 'The selected date and time are not available',
            AnErrorOcurred: 'An error ocurred',
            PageNotFound: 'Page not found',
            ConnectionError: 'Connection error',
            ClassAttendancesSaved: 'Class attendances saved successfully',
            ClassCreated: 'Class created successfully',
            ClassUpdated: 'Class updated successfully',
            TestCreated: 'Test created successfully',
            TestUpdated: 'Test updated successfully',
            NoClasses: 'There are no registered classes',
            NoStudentsClass: 'There are no students enrolled in this class',
            NoTestsClass: 'There are no tests in this class',
            JoinClass: 'Joined class successfully',
            LeaveClass: 'Left class succesfully',
            AccountCreated: 'New account created successfully'
        },
        roles: {
            1: 'Admin',
            2: 'Teacher',
            3: 'Student'
        },
        days: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
    }
}