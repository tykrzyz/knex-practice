INSERT INTO blogful_articles (title, date_published, content)
VALUES
    ('dummy 1', now() - '21 days'::INTERVAL, 'This is an article'),
    ('dummy 2', now() - '21 days'::INTERVAL, 'This is an article'),
    ('dummy 3', now() - '21 days'::INTERVAL, 'This is an article'),
    ('dummy 4', now() - '21 days'::INTERVAL, 'This is an article'),
    ('dummy 5', now() - '20 days'::INTERVAL, 'This is an article'),
    ('dummy 6', now() - '19 days'::INTERVAL, 'This is an article'),
    ('dummy 7', now() - '11 days'::INTERVAL, 'This is an article'),
    ('dummy 8', now() - '11 days'::INTERVAL, 'This is an article'),
    ('dummy 9', now() - '9 days'::INTERVAL, 'This is an article'),
    ('dummy 10', now() - '8 days'::INTERVAL, 'This is an article'),
    ('dummy 11', now() - '7 days'::INTERVAL, 'This is an article'),
    ('dummy 12', now() - '3 days'::INTERVAL, 'This is an article'),
    ('dummy 13', now() - '1 days'::INTERVAL, 'This is an article'),
    ('dummy 14', now(), 'This is an article')
;
