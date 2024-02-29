import {

    DeveloperProfileProjects,
    DeveloperProfileStackList,
    DeveloperProfileLanguages,
    DeveloperProfileCertificates,
    CreateDeveloperAccountRequest,
    DeveloperProfileJobExperiences,
    DeveloperProfileAcademicEducation,

} from "../../../models/profile/candidate.profile";

type AcademicType =
    'Graduação' | 'Bacharelado' |
    'Licenciatura' | 'Mestrado' |
    'Tecnólogo' | 'Estágio' |
    'Doutorado' | 'Técnico' |
    'Pós-graduação' | 'Curso Livre';

type AcademicStatus =
    'Cursando' | 'Concluído' |
    'Trancado' | 'Abandonado' |
    'Interrompido';

type AcademicModality =
    'Educação à distância' | 'Presencial' | 'Semi-Presencial'

class MockDeveloperProfile {

    private getNow() {
        return new Date().getTime().toString()
    }

    private getRandomElement(array: string[]): string {
        return array[Math.floor(Math.random() * array.length)];
    }

    private getStack(): string[] {

        return [
            'JavaScript', 'Node.js', 'React', 'Angular', 'Vue.js', 'Python',
            'Ruby', 'Ruby on Rails', 'Java', 'Spring Boot', 'C#', '.NET', 'PHP',
            'WebSocket', 'Git', 'Jira', 'Webpack', 'Babel', 'Jenkins', 'Travis CI',
            'GraphQL', 'Flask', 'TensorFlow', 'Jest', 'CircleCI', 'Azure', 'Laravel',
            'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Docker', 'Kubernetes', 'AWS',
            'Keras', 'Scikit-learn', 'Express.js', 'RESTful API', 'PyTorch', 'Django',
            'Mocha', 'Chai', 'Selenium', 'Redux', 'MobX', 'RxJS', 'Cypress', 'Jupyter',
            'Google Cloud Platform', 'HTML5', 'CSS3', 'Sass', 'Bootstrap', 'Tailwind CSS',
        ];
    }

    private getNames(): string[] {

        return [
            'PulsePanorama', 'SolarisSpectrum', 'QuantumQuest', 'GalacticGrove',
            'SolarFlare', 'LunarLoom', 'StellarStratos', 'NyxNebula', 'AstralArcade',
            'ChronoSpark', 'NovaVortex', 'TerraByteTrek', 'LuminaLattice', 'ZephyrZen',
            'ZenithZephyr', 'EquinoxEcho', 'AeroSpectra', 'CipherCraft', 'AuroraAegis',
            'EclipseEnigma', 'RadiantRift', 'GalaxyGlade', 'QuasarQuake', 'VortexVoyage',
            'LuminousLabyrinth', 'ZenonZephyr', 'EquinoxEnsemble', 'AeroAether', 'CobaltCascade',
            'QuantumQuasar', 'EchoHarmony', 'NebulaNexus', 'PixelPulse', 'CelestialCipher', 'CipherSync',
            'AetherAmulet', 'HarmonyHaven', 'NebulousNest', 'PixelPalace', 'CelestialCrest', 'CipherSynchrony',
            'AuroraAtlas', 'QuantumQuell', 'EchoEssence', 'NebulaNurturing', 'SpectralSynthesis', 'PolarisPulse'
        ];
    }

    private getLorem(): string {

        const a = 'Lorem ipsum dolor sit amet consectetur adipisicing elit ';
        const b = 'Ipsa, quasi. Officia doloremque quasi nemo rem perferendis recusandae voluptas aliquam, ';
        const c = 'ratione, harum excepturi in laudantium praesentium dolorem ipsa nostrum accusantium quaerat!';
        return a.concat(b).concat(c);
    }

    public getEducation(count: number): Omit<DeveloperProfileAcademicEducation, 'id'>[] {

        const now = this.getNow();
        const names = this.getNames();
        const random = (array: string[]) => this.getRandomElement(array);

        const modality: AcademicModality[] = ['Educação à distância', 'Presencial', 'Semi-Presencial'];
        const status: AcademicStatus[] = ['Cursando', 'Concluído', 'Trancado', 'Abandonado', 'Interrompido'];

        const type: AcademicType[] = [
            'Graduação', 'Bacharelado', 'Licenciatura',
            'Mestrado', 'Tecnólogo', 'Estágio', 'Doutorado',
            'Técnico', 'Pós-graduação', 'Curso Livre'
        ];

        function educationFactory(id: number): Omit<DeveloperProfileAcademicEducation, 'id'> {

            const random_type = random(type) as AcademicType;
            const random_status = random(status) as AcademicStatus;
            const random_modality = random(modality) as AcademicModality;

            return {
                to: now,
                from: now,
                createdAt: now,
                updatedAt: now,
                // id: id.toString(),
                type: random_type,
                course: random(names),
                status: random_status,
                modality: random_modality,
                institution: random(names),
            };
        }

        const education: Omit<DeveloperProfileAcademicEducation, 'id'>[] = [];

        for (let i = 0; i < count; i++) {
            education.push(educationFactory(i));
        }

        return education
    }

    public getJobs(count: number): Omit<DeveloperProfileJobExperiences, 'id'>[] {

        const now = this.getNow();
        const names = this.getNames();
        const lorem = this.getLorem();
        const random = (array: string[]) => this.getRandomElement(array);

        function jobFactory(id: number): Omit<DeveloperProfileJobExperiences, 'id'> {

            return {
                to: now,
                from: now,
                current_job: true,
                resume: lorem,
                updatedAt: now,
                createdAt: now,
                // id: id.toString(),
                company: random(names),
                occupation: random(names),
            };
        }

        const jobs: Omit<DeveloperProfileJobExperiences, 'id'>[] = [];

        for (let i = 0; i < count; i++) {
            jobs.push(jobFactory(i));
        }

        return jobs;
    }

    public getCertificates(count: number): Omit<DeveloperProfileCertificates, 'id'>[] {

        const now = this.getNow();
        const names = this.getNames();
        const workload = ['Horas', 'Meses', 'Anos'];

        const random = (array: string[]) => this.getRandomElement(array);

        function certificatesFactory(id: number): Omit<DeveloperProfileCertificates, 'id'> {

            return {
                // id: id.toString(),
                course: random(names),
                updatedAt: now,
                createdAt: now,
                institution: random(names),
                workload: id.toString().concat(' ').concat(random(workload)),
                link: 'www.google.com.br/'
            }

        }

        const certificates: Omit<DeveloperProfileCertificates, 'id'>[] = [];

        for (let i = 0; i < count; i++) {
            certificates.push(certificatesFactory(i));
        }

        return certificates;
    }

    public getLanguages(count: number): Omit<DeveloperProfileLanguages, 'id'>[] {

        const now = this.getNow();
        const random = (array: string[]) => this.getRandomElement(array);

        const languageLevels: string[] = ['Básico', 'Avançado', 'Intermediário', 'Avançado'];
        const languageNames = ['Português', 'Inglês', 'Russo', 'Espanhol', 'Francês', 'Alemão'];

        function languageFactory(id: number): Omit<DeveloperProfileLanguages, 'id'> {

            return {

                // id: id.toString(),
                createdAt: now,
                updatedAt: now,
                language: random(languageNames),
                level: random(languageLevels),
            };
        }

        const languages: Omit<DeveloperProfileLanguages, 'id'>[] = [];

        for (let i = 0; i < count; i++) {
            languages.push(languageFactory(i));
        }

        return languages;
    }

    public getProjects(count: number): Omit<DeveloperProfileProjects, 'id'>[] {

        const now = this.getNow();
        const names = this.getNames();
        const lorem = this.getLorem();
        const random = (array: string[]) => this.getRandomElement(array);

        function projectsFactory(id: number): Omit<DeveloperProfileProjects, 'id'> {

            return {

                resume: lorem,
                createdAt: now,
                updatedAt: now,
                // id: id.toString(),
                title: random(names),
                link: 'www.google.com.br/',
            };
        }

        const projects: Omit<DeveloperProfileProjects, 'id'>[] = [];

        for (let i = 0; i < count; i++) {
            projects.push(projectsFactory(i));
        }

        return projects;
    }

    public getStackList(count: number): Omit<DeveloperProfileStackList, 'id'>[] {

        const now = this.getNow();
        const stack = this.getStack();
        const workload = ['Horas', 'Meses', 'Anos'];
        const random = (array: string[]) => this.getRandomElement(array);

        function stackFactory(id: number): Omit<DeveloperProfileStackList, 'id'> {

            const random_workload = random(workload);

            return {

                // id: id.toString(),
                createdAt: now,
                updatedAt: now,
                name: random(stack),
                workload: id.toString().concat(' ').concat(random_workload)
            };
        }

        const stacklist: Omit<DeveloperProfileStackList, 'id'>[] = []

        for (let i = 0; i < count; i++) {
            stacklist.push(stackFactory(i));
        }

        return stacklist
    }

}

function getDeveloperProfile(name: string, email: string, _password: string = '1234'): CreateDeveloperAccountRequest {

    const developerProfileMock = new MockDeveloperProfile();

    const stackList = developerProfileMock.getStackList(15);
    const projectsList = developerProfileMock.getProjects(10);
    const languageList = developerProfileMock.getLanguages(5);
    const jobExperiencesList = developerProfileMock.getJobs(5);
    const certificatesList = developerProfileMock.getCertificates(5);
    const academicEducationList = developerProfileMock.getEducation(5);

    const address = {

        cep: '41900485',
        address: 'Rua das Ubaranas',
        number: '777',
        neighborhood: 'Amaralina',
        city: 'Salvador',
        complement: 'Casa',
        state: 'Bahia'
    }

    const about = {

        name,
        age: '27',
        picture:'',
        occupation: 'Desenvolvedor Web',
        resume: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam sed delectus dignissimos ipsa. A amet sunt, minus delectus iusto voluptatum ea cumque est quidem sequi itaque! Facere maiores doloribus totam.'
    }

    const contact = {

        email,
        phone: '00000000000',
        github: 'https://www.google.com/',
        linkedin: 'https://www.google.com/',
    }

    return {

        about,
        contact,
        address,
        password: {
            password: _password,
            // confirm: _password,
        },
        stack: stackList,
        projects: projectsList,
        languages: languageList,
        certificates: certificatesList,
        academic_education: academicEducationList,
        professional_experiences: jobExperiencesList,
    }
}

const developerMockModule = {
    getDeveloperProfile
};

export default developerMockModule