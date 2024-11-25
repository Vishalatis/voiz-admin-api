import { countries } from 'src/assets/data';

import { _mock } from './_mock';
import { _tags } from './assets';

// ----------------------------------------------------------------------

export const Issues_DETAILS_TABS = [
  { value: 'content', label: 'Issues Content' },
  { value: 'bookers', label: 'Booker' },
];

export const Issues_SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export const Issues_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

export const Issues_SERVICE_OPTIONS = [
  { value: 'Audio guide', label: 'Audio guide' },
  { value: 'Food and drinks', label: 'Food and drinks' },
  { value: 'Lunch', label: 'Lunch' },
  { value: 'Private Issues', label: 'Private Issues' },
  { value: 'Special activities', label: 'Special activities' },
  { value: 'Entrance fees', label: 'Entrance fees' },
  { value: 'Gratuities', label: 'Gratuities' },
  { value: 'Pick-up and drop off', label: 'Pick-up and drop off' },
  { value: 'Professional guide', label: 'Professional guide' },
  {
    value: 'Transport by air-conditioned',
    label: 'Transport by air-conditioned',
  },
];

const CONTENT = `
<h6>Description</h6>
<br/>
<p>Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.</p>

<br/>
<br/>
<br/>

<h6>Highlights</h6>
<br/>
<ul>
    <li>A fermentum in morbi pretium aliquam adipiscing donec tempus.</li>
    <li>Vulputate placerat amet pulvinar lorem nisl.</li>
    <li>Consequat feugiat habitant gravida quisque elit bibendum id adipiscing sed.</li>
    <li>Etiam duis lobortis in fames ultrices commodo nibh.</li>
</ul>

<br/>
<br/>
<br/>

<h6>Program</h6>
<br/>
<p><strong>Day 1</strong></p>
<br/>
<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
<br/>
<p><strong>Day 2</strong></p>
<br/>
<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
<br/>
<p><strong>Day 3</strong></p>
<br/>
<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>

<br/>
<br/>
<br/>
`;

const BOOKER = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  guests: index + 10,
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _IssuesGuides = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
}));

export const ISSUE_IMAGES = [...Array(16)].map((_, index) => _mock.image.travel(index));

export const _Issues = [...Array(12)].map((_, index) => {
  const available = {
    startDate: _mock.time(index + 1),
    endDate: _mock.time(index),
  };

  const publish = index % 3 ? 'published' : 'draft';

  const destination = countries.map((option) => option.label)[index];

  const services = (index % 2 && ['Audio guide', 'Food and drinks']) ||
    (index % 3 && ['Lunch', 'Private Issues']) ||
    (index % 4 && ['Special activities', 'Entrance fees']) || [
      'Gratuities',
      'Pick-up and drop off',
      'Professional guide',
      'Transport by air-conditioned',
    ];

  const IssuesGuides =
    (index === 0 && _IssuesGuides.slice(0, 1)) ||
    (index === 1 && _IssuesGuides.slice(1, 3)) ||
    (index === 2 && _IssuesGuides.slice(2, 5)) ||
    (index === 3 && _IssuesGuides.slice(4, 6)) ||
    _IssuesGuides.slice(6, 9);

  const images = ISSUE_IMAGES.slice(index, index + 5);

  return {
    id: _mock.id(index),
    images,
    publish,
    services,
    available,
    IssuesGuides,
    destination,
    bookers: BOOKER,
    content: CONTENT,
    tags: _tags.slice(0, 5),
    name: _mock.IssueName(index),
    createdAt: _mock.time(index),
    durations: '4 days 3 nights',
    price: _mock.number.price(index),
    priceSale: _mock.number.price(index),
    totalViews: _mock.number.nativeL(index),
    ratingNumber: _mock.number.rating(index),
  };
});
