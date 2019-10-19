import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseEditorComponent } from './components/courseEditor/courseEditor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuardService } from './service/auth-guard.service';
import { LogoutComponent } from './components/logout/logout.component';
import { ViewLectureComponent } from './components/view-lecture/view-lecture.component';
import { QuizViewComponent } from './components/quiz-view/quiz-view.component';
import { StatsComponent } from './components/stats/stats.component';
import { AddLectureComponent } from './components/add-lecture/add-lecture.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'courses', component: CoursesComponent, canActivate:[AuthGuardService] },
  { path: 'courseEditor/:course_id', component: CourseEditorComponent, canActivate:[AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService] },
  { path: 'home', component: HomeComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'viewLecture', component: ViewLectureComponent},
  { path: 'quizView', component: QuizViewComponent},
  { path: 'stats', component: StatsComponent},
  { path: 'addLecture/:lecture_id', component: AddLectureComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
