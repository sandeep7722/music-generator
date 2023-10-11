import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicGeneratorComponent } from './music-generator/music-generator.component'; // Import your MusicGeneratorComponent


const routes: Routes = [
  // Other routes
  { path: 'music-generator', component: MusicGeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
